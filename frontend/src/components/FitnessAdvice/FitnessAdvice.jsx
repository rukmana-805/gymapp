import "../FitnessAdvice/FitnessAdvice.css"
import GymBoy from "@/assets/gymboy.png"

const FitnessAdvice = () => {
    return(
        <div>
            <div className="advice-section">
                <div className="advice-left">
                    <h3>All About</h3>
                    <h2><label className="gym">GYM</label> FITNESS</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, iste alias. Adipisci maiores quae veritatis at, perferendis earum quod? Quis, provident? Exercitationem architecto impedit facilis doloribus qui laborum nostrum voluptatibus?</p>
                    <button>Sign Up</button>
                </div>
                <div className="advice-right">
                    <img src={GymBoy} alt="gym boy" />
                </div>
            </div>
        </div>
    )
}

export default FitnessAdvice