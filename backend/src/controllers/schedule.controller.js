import Schedule from "../models/schedule.model.js";
import Trainner from "../models/Trainner.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// const addSchedule = asyncHandler(async (req, resp) => {

//     const {day, classes} = req.body

//     const existSchedule = await Schedule.find({ day })
//     if(existSchedule){
//         return resp.status(400).json({message : "Schedule already exist"})
//     }

//     const schedule = await Schedule.create({
//         day,
//         classes
//     })

//     if(!schedule){
//         return resp.status(400).json({message : "Schedule creation failed"})
//     }

//     resp.status(200).json({
//         message : "Schedule created successfully",
//         schedule
//     })
// })

const addSchedule = asyncHandler(async (req, resp) => {
  const { scheduleList } = req.body;
  const scheduleArray = new Array(6);

  const list = await Schedule.find({});
  if (list.length === 0) {
    for (let i = 0; i < scheduleList.length; i++) {
      const day = scheduleList[i].day;
      const time = scheduleList[i].time;
      const className = scheduleList[i].className;
      const currtrainer = scheduleList[i].trainer;

      const startTime = time.substring(0, 7);
      const endTime = time.substring(10);
      // const trainer = await Trainner.findOne({ name: currtrainer });
      // if (!trainer) {
      //   return resp.status(401).json({ message: "Trainer not found" });
      // }

      const schedule = await Schedule.create({
        day: day,
        classes: [
          {
            name: className,
            startTime: startTime,
            endTime: endTime,
            trainer: currtrainer,
          },
        ],
      });

      if (!schedule) {
        return resp
          .status(401)
          .json({ message: "Error while creating Schedule" });
      }
      scheduleArray[i] = schedule;
    }
  } else {
    //console.log("else part")
    for (let i = 0; i < scheduleList.length; i++) {
      const day = scheduleList[i].day;
      const time = scheduleList[i].time;
      const className = scheduleList[i].className;
      const currtrainer = scheduleList[i].trainer;

      const startTime = time.substring(0, 7);
      const endTime = time.substring(10);
      // const trainer = await Trainner.findOne({ name: currtrainer });
      // if (!trainer) {
      //   return resp.status(401).json({ message: "Trainer not found" });
      // }

      const schedule = await Schedule.findOneAndUpdate(
        { day: day },
        {
          $set: {
            classes: [
              {
                name: className,
                startTime: startTime,
                endTime: endTime,
                trainer: currtrainer,
              },
            ],
          },
        },
        {new : true}
      );

      if (!schedule) {
        return resp
          .status(401)
          .json({ message: "Error while creating Schedule" });
      }
      scheduleArray[i] = schedule;
    }
  }

  resp.status(200).json({
    success: true,
    message: "Schedule Added Successfully",
    scheduleArray,
  });
});

const getAllSchedule = asyncHandler(async (req, resp) => {
  const schedule = await Schedule.find() // .populate("classes.trainner"); populate("classes.trainner") trainner ka sabhi details return karega
  if (!schedule) {
    return resp.status(404).json({ message: "No schedule found" });
  }

  resp.status(200).json({
    message: "Schedule fatched successfully",
    schedule,
  });
});

const deleteSchedule = asyncHandler(async (req, resp) => {
  const { day } = req.params;

  const deletedSchedule = await Schedule.findOneAndDelete({ day });

  if (!deletedSchedule) {
    return resp.status(404).json({ message: "No schedule found for this day" });
  }

  resp.status(200).json({
    message: "Schedule deleted successfully",
    deletedSchedule,
  });
});

const deleteAllSchedule = asyncHandler(async (req, resp) => {

  const result = await Schedule.deleteMany({})
  if(result.deletedCount === 0){
    return resp.status(200).json({message : "No record has deleted"})
  }

  resp.status(200).json({
    success : true,
    message : "All record has been deleted Successfully",
    deletedCount : result.deletedCount
  })

})

const updateSchedule = asyncHandler(async (req, resp) => {
  const { day } = req.params;
  const { classes } = req.body;

  const updatedSchedule = await Schedule.findOneAndUpdate(
    { day },
    { classes },
    { new: true }
  );

  if (!updatedSchedule) {
    return resp.status(404).json({ message: "Schedule not found" });
  }

  return resp.status(200).json({
    message: "Schedule updated successfully",
    updatedSchedule,
  });
});

export { addSchedule, getAllSchedule, deleteSchedule, deleteAllSchedule, updateSchedule };
