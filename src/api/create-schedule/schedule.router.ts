import express from "express";
import scheduleController from "./schedule.controller";

export const scheduleRouter = express.Router();

scheduleRouter.route('/all').get(scheduleController.findAll);

scheduleRouter.route('/add-event').post(scheduleController.addEvent);

scheduleRouter.route('/delete-event').delete(scheduleController.deleteEvent);

scheduleRouter.route('/configure-day').post(scheduleController.configureDay);

//scheduleRouter.route('/update/story/:id').put(scheduleController.updateStory);

//scheduleRouter.route('/create').post(scheduleController.create);

//scheduleRouter.route('/categories').get(scheduleController.findCategories);

//scheduleRouter.route('/story/:id').put(scheduleController.addStory);

//scheduleRouter.route('/way/:id').put(scheduleController.addWay);

//scheduleRouter.route('/title/:id').put(scheduleController.updateTitle);

//scheduleRouter.route('/:id').get(scheduleController.finOne);