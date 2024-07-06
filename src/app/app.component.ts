import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { QuadroComponent } from "./quadro/quadro.component";
import { User } from './model/user';
import { AppService } from './service/app.service';
import { Project } from './model/project';
import { WorkAreaComponent } from "./work-area/work-area.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SidebarComponent, QuadroComponent, WorkAreaComponent]
})
export class AppComponent {
  title = 'kanbanking';



}
