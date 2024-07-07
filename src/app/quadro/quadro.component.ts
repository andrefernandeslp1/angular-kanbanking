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

  index!:number;
  projects: Project[] = [];

  constructor() {
    this.service.projects.subscribe(projects => this.projects = projects);
    this.service.index.subscribe(index => this.index = index);
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.service.getProjects(userId).subscribe(projects => { this.projects = projects; });
    this.service.getIndex().subscribe(index => { this.index = index; });
  }

  imprimir() {
    console.log(this.projects);
    console.log(this.projects[this.index]);
    console.log(this.projects[this.index].cards);
  }

  newCardTitle: string = '';

  addCard() {
    if (this.newCardTitle) {
      const newCard: Card = { title: this.newCardTitle, description: '', tasks: [] };
      // this.service.addCard(newCard, this.projects[this.index].id).subscribe(card => {
      //   this.projects[this.index].cards.push(card);
      //   console.log(card);
      // });
      this.projects[this.index].cards.push(newCard);
      this.service.updateProject(this.projects[this.index], this.projects).subscribe(project => {
        console.log(project);
      });
    }
  }

  addTask(card: Card, newTaskText: HTMLInputElement, indexCard: any) {
    // console.log(newTaskText.value);
    if (newTaskText.value) {
      let newTask: Task = { text: newTaskText.value, done: false, lineThrough: false };
      card.tasks.push(newTask);
      newTaskText.value = '';
      this.service.addTask(newTask, indexCard, card);
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
