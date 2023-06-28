import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {TaskModel} from "../../models/task.model";
import {createReducer, on} from "@ngrx/store";
import * as TaskActions from './task.actions';

export interface TaskState extends EntityState<TaskModel>{
  loading:boolean;
  error:any;
}

export const adapter = createEntityAdapter<TaskModel>();

export const initialState: TaskState = adapter.getInitialState({
  loading: false,
  error: null,
})

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.getAllTasks, state => ({...state, loading:true, error:null})),
  on(TaskActions.getAllTasksSuccess, (state, { tasks}) => adapter.setAll(tasks,{...state, loading:false, error:null})),
  on(TaskActions.getAllTasksFailure, (state, { error }) => ({...state, loading:false, error:error})),

  on(TaskActions.addTask, (state) => ({...state, loading:true, error: null})),
  on(TaskActions.addTaskSuccess, (state, { task }) => adapter.addOne(task,{...state, loading:false, error:null})),
  on(TaskActions.addTaskFailure, (state, { error }) => ({...state, loading:false, error: error})),

  on(TaskActions.updateTask, (state) => ({...state, loading:true, error:null})),
  on(TaskActions.updateTaskSuccess, (state, { task }) => adapter.upsertOne(task, {...state, loading:false, error:null})
  ),
  /*on(TaskActions.updateTaskSuccess, (state, { task }) => {
    const changes = {
      id: task.id || '',
      changes: {
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted
      }
    };
    return adapter.updateOne(changes, {...state, loading:false, error:null})
  }),*/
  on(TaskActions.updateTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(TaskActions.deleteTask, state => ({ ...state, loading: true, error: null })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => adapter.removeOne(id, { ...state, loading: false, error: null })),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),

);

export const {
  selectIds, selectTotal, selectEntities, selectAll
} = adapter.getSelectors()
