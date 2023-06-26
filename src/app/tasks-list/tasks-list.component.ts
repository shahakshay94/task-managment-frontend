import {Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { TaskApiService } from '../task-api.service';

interface Task {
  id?: string | undefined;
  title: string;
  description: string;
  isCompleted?: boolean;
}

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit{

  tasks: Task[] = [];
  taskForm: FormGroup;
  @ViewChild(FormGroupDirective, {static: true}) formGroupDirective!: FormGroupDirective;
  editMode:boolean = false;
  editIndex:number = 0;

  constructor(private taskApiService: TaskApiService,
              private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      title:['', Validators.required],
      description:['',Validators.required],
      isCompleted:[false]
    })
  }
  ngOnInit(): void {
    this.loadAllTasks();
  }

  private loadAllTasks() {
    this.taskApiService.getAllTasks().subscribe(
      tasks => {
        this.tasks = tasks['data'];
      }
    )
  }

  addTask() {
    if (this.taskForm.valid) {
      const task: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        isCompleted: this.taskForm.value.isCompleted
      };

      if (this.editMode) {
        const taskId: string | undefined = this.tasks[this.editIndex].id;
        this.taskApiService.updateTask(taskId, task).subscribe(
          () => {
            this.tasks[this.editIndex] = task;
            this.editMode = false;
            this.taskForm.reset();
            this.formGroupDirective.resetForm();
          },
          error => {
            console.error('Error updating todo:', error);
          }
        );
      } else {
        this.taskApiService.addTask(task).subscribe(
          response => {
            task.id = response.id;
            this.tasks.push(task);
            this.taskForm.reset();
            this.formGroupDirective.resetForm();
          },
          error => {
            console.error('Error adding todo:', error);
          }
        );
      }
    }
  }

  editTask(index: number) {
    this.editIndex = index;
    this.editMode = true;
    const { title, description, isCompleted } = this.tasks[index];
    this.taskForm.setValue({ title, description, isCompleted });
  }

  deleteTask(index: number) {
    const taskId = this.tasks[index].id;
    this.taskApiService.deleteTodo(taskId).subscribe(
      () => {
        this.tasks.splice(index, 1);
      },
      error => {
        console.error('Error deleting todo:', error);
      }
    );
  }

  resetTask(){
    this.taskForm.reset();
    this.formGroupDirective.resetForm();
  }
}
