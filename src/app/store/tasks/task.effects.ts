import {TaskApiService} from "../../task-api.service";
import * as TaskActions from './task.actions';
import {Injectable} from "@angular/core";
import {createEffect} from "@ngrx/effects";
import {Actions, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";

@Injectable()
export class TaskEffects {

  constructor(private actions$: Actions, private taskService: TaskApiService) {
  }

  getAllTasks = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.getAllTasks),
      switchMap(() =>
        this.taskService.getAllTasks().pipe(
          map(tasks => TaskActions.getAllTasksSuccess({tasks: tasks['data']})),
          catchError(error => of(TaskActions.getAllTasksFailure({error})))
        )
      )
    )
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.addTask),
      switchMap(({task}) =>
        this.taskService.addTask(task).pipe(
          map(createdTask => TaskActions.addTaskSuccess({task: createdTask['data']})),
          catchError(error => of(TaskActions.addTaskFailure({error})))
        )
      )
    )
  });


  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap(({task}) =>
        this.taskService.updateTask(task.id, task).pipe(
          map(updatedTask => TaskActions.updateTaskSuccess({task: updatedTask['data']})),
          catchError(error => of(TaskActions.updateTaskFailure({error})))
        )
      )
    )
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      switchMap(({id}) =>
        this.taskService.deleteTask(id).pipe(
          map(() => TaskActions.deleteTaskSuccess({id})),
          catchError(error => of(TaskActions.deleteTaskFailure({error})))
        )
      )
    )
  });
}
