import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[];
  private nextId = 6;
  title: any;
  constructor(private messageService: MessageService) {
    const todos = this.getTodos();
    this.nextId = todos ? (todos[todos.length - 1].id + 1) : 0;
  }

  public addTodo(title: string, description: string, due: string, level: string, status: boolean): void {
    level = level ? level : 'normal';
    const now = new Date();
    const inputDate = new Date(due);
    if (title && due) {
      if (inputDate.getTime() >= now.getTime()) {
        const todo = new Todo(this.nextId, title, description, due, level, false);
        const todos = this.getTodos();
        todos.push(todo);
        this.messageService.add('Thêm thành công');
        this.setLocalStorageTodos(todos);
        this.nextId++;
      } else {
        this.messageService.add('Không thể chọn ngày trong quá khứ');
      }
    } else {
      this.messageService.add('Tiêu đề không được trống');
    }
  }

  public getTodos(): Todo[] {
    const localStorageItem = JSON.parse(localStorage.getItem('todos'));
    const sortedDate = localStorageItem.todos.sort((a: any, b: any) => {
      const dateA: any = new Date(a.due);
      const dateB: any = new Date(b.due);
      return dateA - dateB;
    });
    return localStorageItem === null ? [] : sortedDate;
  }

  public updateTodo(item: any, index: number): void {
    const todos = this.getTodos();
    todos[index] = item;
    this.setLocalStorageTodos(todos);
    this.messageService.add('Update thành công!!');
  }

  public deleteMultiple(result: any): void {
    this.todos = result;
    this.setLocalStorageTodos(this.todos);
  }

  public removeTodo(index: any): void {
    const todos = this.getTodos();
    todos.splice(index, 1);
    this.setLocalStorageTodos(todos);
  }

  public getTodosByTitle(key: string): any[] {
    const todos = this.getTodos();
    const result = todos.filter(s => s.title.toLowerCase().includes(key.toLowerCase()));
    return result;
  }

  public setLocalStorageTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify({todos}));
  }
}
