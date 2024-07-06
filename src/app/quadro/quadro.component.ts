import { Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from '../model/task';
import { Card } from '../model/card';
import { Project } from '../model/project';
import { AppService } from '../service/app.service';
import { User } from '../model/user';
import { LandingComponent } from "../landing/landing.component";

@Component({
    selector: 'app-quadro',
    standalone: true,
    templateUrl: './quadro.component.html',
    styleUrl: './quadro.component.css',
    imports: [CdkDropListGroup, CdkDropList, CdkDrag, FormsModule, LandingComponent]
})
export class QuadroComponent {

  service = inject(AppService);

  index = 0;
  projects: Project[] = [];

  constructor() {
    this.service.projects.subscribe(projects => this.projects = projects);
    this.service.index.subscribe(index => this.index = index);
  }

  ngOnInit() {
    // this.service.projects.subscribe(projects => this.projects = projects);
    // this.service.index.subscribe(index => this.index = index);
    const userId = localStorage.getItem('userId');
    this.service.getProjects(userId).subscribe(projects => {
      this.projects = projects;
      console.log(projects);
      console.log(this.projects);
    });
  }

  imprimir() {
    console.log(this.projects);
    console.log(this.projects[this.index]);
    console.log(this.projects[this.index].cards);
  }

  newCardTitle: string = '';

  addCard() {
    console.log(this.newCardTitle);
    if (this.newCardTitle) {
      let newCard: Card = { title: this.newCardTitle, description: '', tasks: [] };
      this.projects[this.index].cards.push(newCard);
      this.newCardTitle = '';
      // this.service.addCard(newCard, this.projects[this.index].id).subscribe(card => {
      //   this.projects[this.index].cards[this.projects[this.index].cards.length - 1] = card;
      //   console.log(card);
      // });
    }
  }

  addTask(card: Card, newTaskText: HTMLInputElement) {
    console.log(newTaskText.value);
    if (newTaskText.value) {
      let newTask: Task = { text: newTaskText.value, done: false, lineThrough: false };
      card.tasks.push(newTask);
      newTaskText.value = '';
      // this.service.addCard(card, this.projects[this.index].id).subscribe(card => {
      //   console.log(card);
      // });
    }
  }

  // addTask(card: Card, newTaskText: HTMLInputElement) {
  //   console.log(newTaskText.value);
  //   if (newTaskText.value) {
  //     let newTask: Task = { text: newTaskText.value, done: false, lineThrough: false };
  //     card.tasks.push(newTask);
  //     newTaskText.value = '';
  //   }
  // }

  drop(event: CdkDragDrop<Task[]>, tasks: Task[]) {
    moveItemInArray(tasks, event.previousIndex, event.currentIndex);
  }

  toggleRisco(task: Task) {
    task.lineThrough = !task.lineThrough;
  }

  toggleDone(task: Task) {
    task.done = !task.done;
  }

  deleteTask(card: Card, task: Task) {
    card.tasks = card.tasks.filter(t => t !== task);
  }

}
