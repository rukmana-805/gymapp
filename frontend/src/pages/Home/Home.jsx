import BackGymImg from "../../assets/backgymimg.jpg";
import "../Home/Home.css"
import HeaderContent from "../../components/HeaderContent/HeaderContent.jsx";
import Activities from "../../components/Activities/Activities.jsx";
import FitnessAdvice from "../../components/FitnessAdvice/FitnessAdvice.jsx";
import FeaturedClasses from "../../components/FeaturedClasses/FeaturedClasses.jsx";
import Pricing from "../../components/Pricing/Pricing.jsx";
import AvailableEquipment from "../../components/AvailableEquiptment/AvailableEquiptment.jsx";

const Home = () => {
    return (
        <div>
            <div
                className="back-div"
                style={{
                    backgroundImage: `url(${BackGymImg})`,
                    backgroundSize: "115%",
                    backgroundPosition: "90% center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* <Header /> */}
                <HeaderContent />
            </div>

            <Activities />
            <FitnessAdvice />
            <FeaturedClasses />
            <Pricing />
            <AvailableEquipment />
            
        </div>
    )
}

export default Home