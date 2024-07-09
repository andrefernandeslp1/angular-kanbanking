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
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-quadro',
    standalone: true,
    templateUrl: './quadro.component.html',
    styleUrl: './quadro.component.css',
    imports: [CdkDropListGroup, CdkDropList, CdkDrag, FormsModule, LandingComponent]
})
export class QuadroComponent {

  service = inject(AppService);

  // private subscription: Subscription;

  index!:number;
  projects: Project[] = [];

  constructor() {
    this.service.projects.subscribe(projects => this.projects = projects);
    this.service.index.subscribe(index => this.index = index);

    // this.subscription = this.service.projects.subscribe(projects => this.projects = projects);
    // this.subscription = this.service.index.subscribe(index => this.index = index);
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.service.getProjects(userId).subscribe(projects => { this.projects = projects; });
    this.service.getIndex().subscribe(index => { this.index = index; });
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  newCardTitle: string = '';

  addCard() {
    if (this.newCardTitle) {
      const newCard: Card = { title: this.newCardTitle, description: '', tasks: [] };
      this.projects[this.index].cards.push(newCard);
      this.service.updateProject(this.projects[this.index], this.projects).subscribe(project => {
        console.log(project);
      });
    }
  }

  addTask(newTaskText: HTMLInputElement, indexCard: any) {
    if (newTaskText.value) {
      let newTask: Task = { text: newTaskText.value, done: false, lineThrough: false };
      // card.tasks.push(newTask);
      this.projects[this.index].cards[indexCard].tasks.push(newTask);
      this.service.updateProject(this.projects[this.index], this.projects).subscribe(project => {
        console.log(project);
      });
      newTaskText.value = '';
    }
  }

  drop(event: CdkDragDrop<Task[]>, tasks: Task[]) {
    moveItemInArray(tasks, event.previousIndex, event.currentIndex);
    this.service.updateProject(this.projects[this.index], this.projects).subscribe(project => {
      console.log(project);
    });
  }

  toggleRisco(task: Task) {
    task.lineThrough = !task.lineThrough;
    this.service.updateProject(this.projects[this.index], this.projects).subscribe(project => {
      console.log(project);
    });
  }

  editTask(task: Task) {
    const newText = window.prompt('Edit the task', task.text);
    if (newText) {
      task.text = newText;
      this.service.updateProject(this.projects[this.index], this.projects).subscribe(project => {
        console.log(project);
      });
    }
  }


  toggleDone(task: Task) {
    task.done = !task.done;
    this.service.updateProject(this.projects[this.index], this.projects).subscribe(project => {
      console.log(project);
    });

  }

  deleteTask(card: Card, task: Task) {
    card.tasks = card.tasks.filter(t => t !== task);
    this.service.updateProject(this.projects[this.index], this.projects).subscribe(project => {
      console.log(project);
    });
  }

}
