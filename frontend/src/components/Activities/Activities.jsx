import React from "react";
import "../Activities/Activities.css"
import WeightTraining from "../../assets/weighttrainingicon.png"
import Running from "../../assets/runningicon.png"
import Yoga from "../../assets/yogaicon.png"
import Jumping from "../../assets/jumpingicon.png"

const Activities = () => {
    return(
        <div className="activities-parent">
            <h1>Activities</h1>
            <div className="activities-container">
                <div className="activities">
                    <img src={WeightTraining} alt="Weight Training" />
                    <h3>Weight Training</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quae non ducimus ut quas voluptates culpa fugit blanditiis repellat quasi!
                    </p>
                    <button>See Details</button>
                </div>
                <div className="activities">
                    <img src={Yoga} alt="Yoga" />
                    <h3>Yoga</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quae non ducimus ut quas voluptates culpa fugit blanditiis repellat quasi!
                    </p>
                    <button>See Details</button>
                </div>
                <div className="activities">
                    <img src={Running} alt="Running" />
                    <h3>Cardio</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quae non ducimus ut quas voluptates culpa fugit blanditiis repellat quasi!
                    </p>
                    <button>See Details</button>
                </div>
                <div className="activities">
                    <img src={Jumping} alt="Jumping" />
                    <h3>Jumping</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quae non ducimus ut quas voluptates culpa fugit blanditiis repellat quasi!
                    </p>
                    <button>See Details</button>
                </div>
            </div>
        </div>
    )
}

export default Activities