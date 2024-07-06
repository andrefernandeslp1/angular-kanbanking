import { Component, inject } from '@angular/core';
import { User } from '../model/user';
import { Project } from '../model/project';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  service = inject(AppService);

  index = 0;
  projects: Project[] = [];
  user: User = {} as User;

  constructor() {
    this.service.projects.subscribe(projects => this.projects = projects);
    this.service.user.subscribe(user => this.user = user);
    this.service.index.subscribe(index => this.index = index);
   }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    this.service.getUser(Number(userId)).subscribe(user => {
      this.user = user; // Now correctly passing a User object
      console.log(this.user);
      console.log(this.user);
    });
    this.service.getProjects(userId).subscribe(projects => {
      this.projects = projects;
      console.log(projects);
      console.log(this.projects);
    });
    this.setProject(0);
  }

  setProject(i: any) {
    this.service.setIndex(i);
  }

  // project: Project = {} as Project;

  createProject() {
    const project = { userId: this.user.id, title: window.prompt('Enter the project name'), description: '', cards: [] } as Project;
    this.service.addProject(project).subscribe(project => {
      this.projects.push(project);
      console.log(project);
      this.setProject(this.projects.length - 1);
      // window.location.reload();
    });
  }

}
