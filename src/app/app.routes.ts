import { Routes } from '@angular/router';
import { QuadroComponent } from './quadro/quadro.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WorkAreaComponent } from './work-area/work-area.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [

  {path: "quadro", component: QuadroComponent},
  {path: "sidebar", component: SidebarComponent},
  {path: "work-area", component: WorkAreaComponent},
  {path: "landing", component: LandingComponent},
  {path: "", redirectTo: "/landing", pathMatch: "full"}

];
