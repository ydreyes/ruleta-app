import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login exitoso. Redirigiendo a /ruleta...');
        localStorage.setItem('token', res.token);
        this.router.navigate(['/ruleta']);
        console.log('redirigiendo....');
      },
      error: (err) => {
        Swal.fire('Error', err.error?.error || 'Error al iniciar sesión', 'error');
      },
    });
  }

}
