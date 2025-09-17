import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import emptyProfile from "@/assets/emptyprofile.png"; // Apna path theek rakhna
import "../ProfileUpload/ProfileUpload.css";
import axiosInstance from "../../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";

const ProfileUploadPage = ({ profileId, who, showProfileEdit, getAllTrainer, setShowProfileEdit }) => {
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const navigate = useNavigate();

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setCroppedImage(null);
    }
  };

  const uploadProfileHandle = async () => {
    if (!croppedImage) {
      alert("Plzz select image before upload");
    }

    try {
      const formData = new FormData();
      if (showProfileEdit === true && profileId !== "") {

        formData.append("profilePic", croppedImage)
        formData.append("profileId", profileId)
        console.log(profileId)

        const res = await axiosInstance.post("/admin/upload-profile", formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        console.log("Success",res.data.success)
        if (res.data.success){
          alert("Profile Picture Upload Successfully")
          getAllTrainer()
          setShowProfileEdit(false)
        }

      } else {

        formData.append("profilePic", croppedImage);

        const res = await axiosInstance.post(
          "/users/upload-profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        //console.log(res.data.status)
        if (res.data.success) {
          alert("Profile Updated Successfully");
          const resp = await axiosInstance.post("/users/logout");
          if (resp.data.success) {
            console.log("User logout successfully");
          }
          navigate("/");
        } else {
          alert("Error while uploading profile");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCroppedImg = async (imageSrc, pixelCrop, isCircle = false) => {
    const image = new Image();
    image.src = imageSrc;

    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        if (isCircle) {
          ctx.beginPath();
          ctx.arc(
            pixelCrop.width / 2,
            pixelCrop.height / 2,
            pixelCrop.width / 2,
            0,
            2 * Math.PI
          );
          ctx.closePath();
          ctx.clip();
        }

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        canvas.toBlob((blob) => {
          //   resolve(URL.createObjectURL(blob));
          const file = new File([blob], "profile.png", { type: "image/png" });
          resolve(file);
        }, "image/png");
      };
    });
  };

  const showCroppedImage = async () => {
    try {
      const cropped = await getCroppedImg(image, croppedAreaPixels, true);
      setCroppedImage(cropped);
      setImage(null); // hide cropper
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="most-parent">
        <div className="upload-profile-parent">
          <div className="upload-profile-body">
            <h2>Upload {who.length === 0 ? "Your" : who} Profile Picture</h2>

            <div className="profile" onClick={() => inputRef.current.click()}>
              {croppedImage ? (
                <img
                  src={URL.createObjectURL(croppedImage)}
                  alt="Final profile"
                />
              ) : (
                <img src={emptyProfile} alt="empty profile" />
              )}
              <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                className="profile-file-input"
              />
            </div>

            <div className="action-button">
              {showProfileEdit === false ? (
                <button className="upload-button">Skip</button>
              ) : (
                <button
                  onClick={() => setShowProfileEdit(false)}
                  className="upload-button"
                >
                  Cancel
                </button>
              )}
              <button className="upload-button" onClick={uploadProfileHandle}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      {image && (
        <div className="preview">
          <div className="preview-inner">
            <h3>Crop Your Image</h3>
            <div className="crop-container">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
            />
            <button className="crop-btn" onClick={showCroppedImage}>
              Crop
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileUploadPage;
