import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { QuadroComponent } from "./quadro/quadro.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SidebarComponent, QuadroComponent]
})
export class AppComponent {
  title = 'kanbanking';
}
