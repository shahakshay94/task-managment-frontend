import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormGroupDirective} from '@angular/forms';
import {TaskApiService} from '../task-api.service';
import {TaskModel} from "../models/task.model";
import * as TaskActions from '../store/tasks/task.actions';
import {TaskState} from "../store/tasks/task.reducer";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  // @ts-ignore
  tasks$: Observable<TaskModel[]>;
  taskForm: FormGroup;
  @ViewChild(FormGroupDirective, {static: true}) formGroupDirective!: FormGroupDirective;
  editMode: boolean = false;
  editTaskId: string = '';

  constructor(private taskApiService: TaskApiService,
              private formBuilder: FormBuilder,
              private store: Store<TaskState>) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      isCompleted: [false]
    })
  }

  ngOnInit(): void {
    this.tasks$ = this.store.pipe(select((state:any) => {
      let tmp_tasks:TaskModel[] = [];
      const tmp_entities = state['tasks']['entities'];
      for (let id in tmp_entities){
        tmp_tasks.push(<TaskModel>tmp_entities[id])
      }
      return tmp_tasks
    }));
    this.store.dispatch(TaskActions.getAllTasks());
  }


  addTask() {
    if (this.taskForm.valid) {
      const task: TaskModel = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        isCompleted: this.taskForm.value.isCompleted
      };

      if (this.editMode) {
        this.store.dispatch(TaskActions.updateTask({ task: {...task, id:this.editTaskId } }))
        this.editMode = false;
      } else {
        this.store.dispatch(TaskActions.addTask({ task }))
      }
      this.taskForm.reset();
      this.formGroupDirective.resetForm();
    }
  }

  editTask(task: TaskModel) {
    const {title, description, isCompleted , id} = task;
    this.editMode = true;
    this.editTaskId = id || '';
    this.taskForm.setValue({title, description, isCompleted});
  }

  deleteTask(id: string) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  resetTask() {
    this.taskForm.reset();
    this.formGroupDirective.resetForm();
  }
}
