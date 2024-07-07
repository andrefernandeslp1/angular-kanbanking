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
    this.service.getUser(userId).subscribe(user => { this.user = user; });
    this.service.getProjects(userId).subscribe(projects => { this.projects = projects; });
    this.service.getIndex().subscribe(index => { this.index = index; });
  }

  setProject(i: any) {
    this.service.setIndex(i); // fica visível para todos os componentes
    // this.index = i; // não fica visível para todos os componentes
  }

  // project: Project = {} as Project;

  createProject() {
    const project = { userId: this.user.id, title: window.prompt('Enter the project name'), description: '', cards: [] } as Project;
    this.projects.push(project);
    this.service.addProject(project, this.projects).subscribe(project => {
      // this.setProject(this.projects.length);
      console.log(project);
      // this.projects.push(project);
      // this.setProject(this.projects.length - 1);
    });
    this.service.setIndex(this.projects.length - 1).subscribe(index => {
      console.log(index);
    });
    // this.service.addProject(project).subscribe(project => {
    //   this.projects.push(project);
    //   console.log(project);
    //   this.setProject(this.projects.length - 1);
    // });
  }

}
