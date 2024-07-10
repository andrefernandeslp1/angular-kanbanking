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

  index!: number;
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
    this.service.setIndex(i);
  }

  createProject() {
    const projectName = window.prompt('Insira o nome do projeto:');
    if (projectName) {
      const project = { userId: this.user.id, title: projectName, description: '', cards: [] } as Project;
      this.projects.push(project);
      this.service.addProject(project, this.projects).subscribe(project => {
        this.projects[this.projects.length - 1] = project;
        console.log(project);
      });
      this.service.setIndex(this.projects.length - 1).subscribe(index => {
        console.log(index);
      });
    }
  }

  deleteProject(id:any) {
    if (window.confirm('Tem certeza que quer apagar este Projeto?')) {
      this.projects.splice(this.projects.findIndex(project => project.id === id), 1);
      this.service.deleteProject(id).subscribe(project => {
        console.log(project);
      });
      this.service.setIndex(0).subscribe(index => {
        console.log(index);
      });
    }
  }

}
