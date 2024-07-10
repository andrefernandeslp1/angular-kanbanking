import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private snackBar:MatSnackBar)
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
      // error: (e) => console.error(e)
      error: (e) => this.snackBar.open(e.error , "⚠️", {duration:3000 })
    });
  }

  onSignIn() {
    this.service.signin(this.form.value).subscribe({
      next: (v) => {
        console.log(v),
        this.router.navigate(['/work-area']);
      },
      // error: (e) => console.error(e)
      error: (e) => this.snackBar.open(e.error, "⚠️", {duration:3000 })
    });
  }

  imprimir() {
    console.log(this.service.projects);
  }

}
