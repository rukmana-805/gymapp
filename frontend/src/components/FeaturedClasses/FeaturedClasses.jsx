import "../FeaturedClasses/FeaturedClasses.css"
import BodyBuildingImage from "@/assets/bodybuildingimage.jpg"
import YogaImage from "@/assets/yogaimage.jpg"
import RunningImage from "@/assets/RunningImage.jpg"
import CalenderIcon from "@/assets/calendericon.png"
import TimeIcon from "@/assets/timeicon.png"


const FeaturedClasses = () => {
    return(
        <div className="class-parent">
            <div className="class-content">
                <button>FEATURED CLASSES</button>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati accusantium consectetur rerum repellendus dolorem necessitatibus aut nam vero hic dolore.</p>
            </div>
            <div className="classes">
                <div className="classes-box">
                    <img src={BodyBuildingImage} alt="Body Building" />
                    <h3>Body Building Classes</h3>
                    <div className="class-schedule">
                        <div className="time">
                            <img src={TimeIcon} alt="icon" />
                            <p>10-11 AM</p>
                        </div>
                        <div className="date">
                            <img src={CalenderIcon} alt="icon" />
                            <p>20-05-2025</p>
                        </div>
                    </div>
                </div>
                <div className="classes-box">
                    <img src={YogaImage} alt="Yoga" />
                    <h3>Yoga Classes</h3>
                    <div className="class-schedule">
                        <div className="time">
                            <img src={TimeIcon} alt="icon" />
                            <p>10-11 AM</p>
                        </div>
                        <div className="date">
                            <img src={CalenderIcon} alt="icon" />
                            <p>20-05-2025</p>
                        </div>
                    </div>
                </div>
                <div className="classes-box">
                    <img src={RunningImage} alt="Running" />
                    <h3>Running Classes</h3>
                    <div className="class-schedule">
                        <div className="time">
                            <img src={TimeIcon} alt="icon" />
                            <p>10-11 AM</p>
                        </div>
                        <div className="date">
                            <img src={CalenderIcon} alt="icon" />
                            <p>20-05-2025</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedClasses