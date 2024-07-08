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
    this.service.setIndex(i); // fica visível para todos os componentes subscritos a indexSource
    // this.index = i; // NÃO fica visível para todos os componentes subscritos a indexSource
  }

  createProject() {
    const projectName = window.prompt('Enter the project name');
    if (projectName) {
      const project = { userId: this.user.id, title: projectName, description: '', cards: [] } as Project;
      this.projects.push(project);
      this.service.addProject(project, this.projects).subscribe(project => {
        console.log(project);
      });
      this.service.setIndex(this.projects.length - 1).subscribe(index => {
        console.log(index);
      });
    }
  }

}
