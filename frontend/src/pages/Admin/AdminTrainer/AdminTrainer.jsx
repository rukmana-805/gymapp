import { useEffect, useState } from "react";
import AdminSidebar from "../AdminSide/AdminSide";
import "../AdminTrainer/AdminTrainer.css";
import TrainerImage from "../../../assets/trainner1.jpg";
import axiosInstance from "../../../utils/axiosInstance";
import ProfileUpload from "../../ProfileUpload/ProfileUpload.jsx";

const AdminTrainer = () => {
  const [trainers, setTrainers] = useState([
    // {
    //   id : 1,
    //   name: "Raj Sharma",
    //   specialization: "Weight Training",
    //   experienceInYears: 5,
    //   profilePic: TrainerImage,
    //   email: "raj@example.com",
    //   phone: "9876543210",
    // },
    // {
    //   id: 2,
    //   name: "Priya Singh",
    //   specialization: "Yoga",
    //   experienceInYears: 7,
    //   profilePic: TrainerImage,
    //   email: "priya@example.com",
    //   phone: "9876501234",
    // },
  ]);

  const handleAdd = () => {
    setShowForm(true);
  };

  const [showForm, setShowForm] = useState(false);
  const [profileId, setProfileId] = useState("");
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experienceInYears: "",
    profilePic: "",
    email: "",
    phone: "",
  });
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    specialization: "",
    experienceInYears: "",
    // profilePic: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post("/admin/create-trainner", {
        name: formData.name,
        specialization: formData.specialization,
        experienceInYears: formData.experienceInYears,
        profilePic: "",
        email: formData.email,
        phone: formData.phone,
      });

      if (data.success) {
        alert("Trainer Added Successfully");
        getAllTrainer();
        setShowForm(false);
      }
    } catch (error) {
      console.error(error);
      console.log(error);
    }

    // console.log("New Trainer:", formData);
    setFormData({
      name: "",
      specialization: "",
      experienceInYears: "",
      profilePic: "",
      email: "",
      phone: "",
    });
    setShowForm(false);
  };

  const uploadTrainerProfile = async (key) => {
    setShowProfileEdit(true);
    setProfileId(key);
  };

  const handleEdit = (trainer) => {
    setShowEditForm(true);
    setEditFormData({
      id: trainer._id,
      name: trainer.name,
      specialization: trainer.specialization,
      experienceInYears: trainer.experienceInYears,
      email: trainer.email,
      phone: trainer.phone,
    });
  };

  const handleDelete = async (id) => {
    // setTrainers(trainers.filter((t) => t._id !== id));
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trainer"
    );
    if (confirmDelete) {
      const { data } = await axiosInstance.delete(`admin/delete-trainer/${id}`);
      if (data.success) {
        alert(data.message);
        getAllTrainer();
      }
    }
  };

  const handleEditTrainer = async (e) => {
    // console.log(editFormData.id)
    e.preventDefault();
    const { data } = await axiosInstance.put(
      `/admin/update-trainer/${editFormData.id}`,
      {
        name: editFormData.name,
        specialization: editFormData.specialization,
        experienceInYears: editFormData.experienceInYears,
        email: editFormData.email,
        phone: editFormData.phone,
      }
    );
    console.log(data);
    if (data.success) {
      alert("Trainer Updated Successfully");
      await getAllTrainer();
      setShowEditForm(false);
    } else {
      alert("Error while Editing Trainer");
    }
  };

  const getAllTrainer = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/get-trainners");
      let trainners = new Array(data?.trainners?.length);
      for (let i = 0; i < trainners.length; i++) {
        trainners[i] = data?.trainners[i];
      }
      setTrainers(trainners);
      console.log(trainners);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };

  const handleClearAll = async () => {
    try {
      const deleteConfirm = window.confirm(
        "Are you sure you want to delete all records?"
      );
      if (deleteConfirm) {
        const { data } = await axiosInstance.delete("/admin/delete-all");
        if (data.success) {
          alert("All trainers are deleted Successfully");
          getAllTrainer();
        } else {
          alert("Error while clearing all Trainers");
        }
      }
    } catch (error) {
      console.error(error);
      console.log("Somthing went wrong", error);
    }
  };

  useEffect(() => {
    getAllTrainer();
  }, []);

  return (
    <div className="admin-trainer-page">
      <AdminSidebar />
      <div className="admin-trainer-content">
        <div className="trainer-header">
          <h2>Trainer Management</h2>
          <div
            style={{ display: "flex", gap: "10px" }}
            className="tainer-side-button"
          >
            <button className="add-trainer-btn" onClick={handleAdd}>
              + Add Trainer
            </button>
            <button onClick={handleClearAll} className="add-trainer-btn">
              Clear All
            </button>
          </div>
        </div>

        <div className="trainer-list">
          {trainers.map((trainer) => (
            <div key={trainer._id} className="trainer-card">
              <div className="trainer-img">
                <img
                  onClick={() => uploadTrainerProfile(trainer._id)}
                  src={trainer.profilePic}
                  alt={trainer.name}
                />
              </div>
              <div className="trainer-info">
                <h3>{trainer.name}</h3>
                <p>
                  <strong>Specialization:</strong> {trainer.specialization}
                </p>
                <p>
                  <strong>Experience:</strong> {trainer.experienceInYears} years
                </p>
                <p>
                  <strong>Email:</strong> {trainer.email}
                </p>
                <p>
                  <strong>Phone:</strong> {trainer.phone}
                </p>
              </div>
              <div className="buttons-admin-trainer">
                <button
                  className="edit-trainer-btn"
                  onClick={() => handleEdit(trainer)}
                >
                  Edit
                </button>
                <button
                  className="delete-trainer-btn"
                  onClick={() => handleDelete(trainer._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3>Add New Trainer</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Trainer Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="experienceInYears"
                placeholder="Experience in Years"
                value={formData.experienceInYears}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showProfileEdit && (
        <div className="popup-overlay">
          <div className="popup-edit-profile">
            <ProfileUpload
              profileId={profileId}
              who="Trainer"
              showProfileEdit={showProfileEdit}
              setShowProfileEdit={setShowProfileEdit}
              getAllTrainer={getAllTrainer}
            />
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <form onSubmit={handleEditTrainer}>
              <h3>Edit Trainer Profile</h3>
              <div className="edit-boxes">
                <input
                  type="text"
                  name="name"
                  placeholder="Trainer Name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="specialization"
                  placeholder="Specialization"
                  value={editFormData.specialization}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="number"
                  name="experienceInYears"
                  placeholder="Experience in Years"
                  value={editFormData.experienceInYears}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={editFormData.phone}
                  onChange={handleEditChange}
                  required
                />
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowEditForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTrainer;
