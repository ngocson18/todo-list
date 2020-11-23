import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  title: any;
  due: any;
  description: any;
  level: any;
  status: boolean;
  minDate: any;
  // show = false;

  todo: Todo = {
    id: 0,
    title: '',
    description: '',
    due: '',
    level: '',
    status: false,
  };

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.minDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
  }

  addTodo(): void {
    this.todoService.addTodo(this.title, this.description, this.due, this.level, false);
  }
}
