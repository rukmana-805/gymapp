import React from "react";
import "../AboutUs/AboutUs.css";
import BodyBuildingImage from "../../assets/BodybuildingImage.jpg";
import Trainner1 from "../../assets/trainner1.jpg";
import Trainner2 from "../../assets/trainner2.jpg";
import Trainner3 from "../../assets/trainner3.jpg";


const AboutUs = () => {
  return (
    <div>
      <div className="about-page">
        <section className="about-hero">
          <div className="about-content">
            <h1>
              All About <span className="highlight">GYM FITNESS</span>
            </h1>
            <p>
              Welcome to our fitness center! We are committed to helping you
              achieve your health and fitness goals with personalized plans,
              professional trainers, and modern equipment.
            </p>
            <button className="cta-button">Join Now</button>
          </div>
          <div className="about-image">
            <img src={BodyBuildingImage} alt="Back muscle man" />
          </div>
        </section>

        <section className="mission-section">
          <h2 className="section-title">Our Mission</h2>
          <p>
            Our mission is to empower individuals of all ages and fitness levels
            to live healthier, more active lives. We believe in discipline,
            commitment, and community.
          </p>
        </section>

        <section className="team-section">
          <h2 className="section-title">Meet Our Trainers</h2>
          <div className="team-grid">
            <div className="trainer-card">
              <img src={Trainner1} alt="Trainer 1" />
              <h3>Alex Johnson</h3>
              <p>Strength Coach</p>
            </div>
            <div className="trainer-card">
              <img src={Trainner2} alt="Trainer 2" />
              <h3>Sophia Lee</h3>
              <p>Yoga & Flexibility</p>
            </div>
            <div className="trainer-card">
              <img src={Trainner3} alt="Trainer 3" />
              <h3>David Miller</h3>
              <p>Cardio & Endurance</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
