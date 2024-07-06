import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  form: FormGroup;

  service = inject(AppService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  constructor()
  {
    this.form = this.formBuilder.group({
      username: [null],
      email: [null],
      password: [null]
    });
  }

  onSignUp() {
    this.service.signup(this.form.value).subscribe({
      next: (v) => {
        console.log(v),
        this.router.navigate(['/work-area']);
      },
      error: (e) => console.error(e)
    });
  }

  onSignIn() {
    this.service.signin(this.form.value).subscribe({
      next: (v) => {
        console.log(v),
        this.router.navigate(['/work-area']);
      },
      error: (e) => console.error(e)
    });
  }

  imprimir() {
    console.log(this.service.projects);
  }

}
