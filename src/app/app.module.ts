import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  {path: 'todo-list', component: TodoListComponent},
  {path: 'create', component: CreateTaskComponent},
  {path: '', redirectTo: '/todo-list', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CreateTaskComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
