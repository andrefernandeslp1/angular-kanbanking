import { Component, inject } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { QuadroComponent } from "../quadro/quadro.component";
import { Project } from '../model/project';
import { User } from '../model/user';
import { AppService } from '../service/app.service';

@Component({
    selector: 'app-work-area',
    standalone: true,
    templateUrl: './work-area.component.html',
    styleUrl: './work-area.component.css',
    imports: [SidebarComponent, QuadroComponent]
})
export class WorkAreaComponent {

  constructor() {}


  ngOnInit() {}



}
