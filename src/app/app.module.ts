import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { MatLineModule } from "@angular/material/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatLineModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
