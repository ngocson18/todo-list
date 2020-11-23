import { ElementRef, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { MessageService} from '../message.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoList: any[];
  display: any;
  show: any;
  temp: Array<any> = [];
  result: Array<any> = [];
  Level = [{id: 1, value: 'low'}, {id: 1, value: 'normal'}, {id: 3, value: 'high'}];
  @Input()
  todo: Todo;

  @ViewChild('search') search: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef;
  @ViewChild('due') due: ElementRef;
  @ViewChild('level') level: ElementRef;
  @ViewChild('status') status: ElementRef;

  constructor(
    private todoService: TodoService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.getTodos();
    this.show = false;
  }

  public getTodos(): void {
    this.todoList = this.todoService.getTodos().sort();
  }

  public completeTodo(item: string, isChecked: boolean): void {
    if (isChecked) {
      this.temp.push(item);
    } else {
      const index = this.temp.indexOf(item);
      this.temp.splice(index, 1);
    }
    this.result = this.temp;
    if (this.temp.length === 0) {
      this.show = false;
      this.getTodos();
    } else {
      this.show = true;
    }
  }

  public deleteMultiple(): void {
    this.result.forEach(e => {
      const index = this.todoList.indexOf(e);
      this.todoList.splice(index, 1);
    });
    this.todoService.deleteMultiple(this.todoList);
    this.temp = [];
    this.show = false;
  }

  public updateTodo(item): any{
    const index = this.todoList.indexOf(item);
    item.title = this.title.nativeElement.value;
    item.description = this.description.nativeElement.value;
    item.due = this.due.nativeElement.value;
    item.level = this.level.nativeElement.value;
    this.todoService.updateTodo(item, index);
  }

  public removeTodo(index): void{
    this.todoService.removeTodo(index);
    this.getTodos();
  }

  public getTodosByTitle(): any[] {
    const key = this.search.nativeElement.value;
    return this.todoList = this.todoService.getTodosByTitle(key);
  }

  open(index: any): void{
    this.display = index;
  }
}
