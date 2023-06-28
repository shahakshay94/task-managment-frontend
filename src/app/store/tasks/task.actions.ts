import {createAction, props} from "@ngrx/store";
import {TaskModel} from "../../models/task.model";

export const getAllTasks = createAction('[Task] Get All Tasks');
export const getAllTasksSuccess = createAction('[Task] Get All Tasks Success', props<{ tasks: TaskModel[] }>());
export const getAllTasksFailure = createAction('[Task] Get All Tasks Failure', props<{ error: any }>());

export const addTask = createAction('[Task] Add Task', props<{ task: TaskModel }>());
export const addTaskSuccess = createAction('[Task] Add Task Success', props<{ task: TaskModel }>());
export const addTaskFailure = createAction('[Task] Add Task Failure', props<{ error: any }>());

export const deleteTask = createAction('[Task] Delete Task', props<{ id: string }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ id: string }>());
export const deleteTaskFailure = createAction('[Task] Delete Task Failure', props<{ error: any }>());

export const updateTask = createAction('[Task] Update Task', props<{ task: TaskModel }>());
export const updateTaskSuccess = createAction('[Task] Update Task Success', props<{ task: TaskModel }>());
export const updateTaskFailure = createAction('[Task] Update Task Failure', props<{ error: any }>());
