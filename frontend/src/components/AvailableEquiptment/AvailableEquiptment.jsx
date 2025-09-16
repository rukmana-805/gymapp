import React, { useState } from "react";
import "../AvailableEquiptment/AvailableEquiptment.css";
import Dumble from "../../assets/Dumble.jpg";
import RowMachine from "../../assets/RowMachine.jpg";
import Trademill from "../../assets/Trademill.jpg";
import Kettlebells from "../../assets/Kettlebells.jpg";

import axiosInstance from "../../utils/axiosInstance";
import { useEffect } from "react";

const AvailableEquipment = () => {

  const [equiptments, setEquiptments] = useState([])
  const equipmentList = [
    {
      title: "Treadmill",
      image: Trademill,
      available: "5 Units",
    },
    {
      title: "Dumbbells",
      image: Dumble,
      available: "12 Sets",
    },
    {
      title: "Rowing Machine",
      image: RowMachine,
      available: "3 Machines",
    },
    {
      title: "Kettlebells",
      image: Kettlebells,
      available: "10 Bells",
    },
  ];

  const fetchData = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/get-all-equiptment");
      setEquiptments(data.equiptments || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setEquiptments([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <section className="equipment-section">
      <h2 className="equipment-title">AVAILABLE EQUIPMENT</h2>
      <p className="equipment-desc">
        Explore the top-quality gym gear available for your training needs. From
        strength to cardio, we’ve got you covered.
      </p>
      {/* <button onClick={fetchEquiptment}>Fetch</button> */}

      <div className="equipment-grid">
        {equiptments.map((item, index) => (
          <div className="equipment-card" key={index}>
            <img src={item.image} alt="items" />
            <div className="equipment-info">
              <h3>{item.name}</h3>
              <p>
                <i className="fa fa-check-circle"></i> {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailableEquipment;
