import { Component } from '@angular/core';
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

@Component({
  selector: 'app-quadro',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, FormsModule],
  templateUrl: './quadro.component.html',
  styleUrl: './quadro.component.css'
})
export class QuadroComponent {

  project: Project = {
    title: 'Project 1',
    description: 'This is a sample project',
    cards: []
  };
  newCardTitle: string = '';
  newTaskText: string = '';
  cards: Card[] = [];
  tasks: Task[] = [];

  addCard() {
    console.log(this.newCardTitle);
    if (this.newCardTitle) {
      let newCard: Card = { title: this.newCardTitle, description: '', tasks: [] };
      this.cards.push(newCard);
      this.newCardTitle = '';
    }
  }

  addTask(card: Card) {
    console.log(this.newTaskText);
    if (this.newTaskText) {
      let newTask: Task = { text: this.newTaskText, done: false, lineThrough: false };
      card.tasks.push(newTask);
      this.newTaskText = '';
    }
  }

  drop(event: CdkDragDrop<Task[]>, tasks: Task[]) {
    moveItemInArray(tasks, event.previousIndex, event.currentIndex);
  }



}
