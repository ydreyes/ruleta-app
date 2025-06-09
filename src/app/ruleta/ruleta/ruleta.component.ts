import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruleta',
  standalone: true,
  imports: [],
  templateUrl: './ruleta.component.html',
  styleUrl: './ruleta.component.scss'
})

export class RuletaComponent {
  girando = false;
  grados = 0;
  intentos = 0;
  premioNombre = '';
  api = 'http://localhost:3000/api/spin';

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  girarRuleta() {
    if (this.girando) return;

    this.intentos++;

    //verificar si es el segundo intento
    if (this.intentos > 1) {
      Swal.fire('Atención', 'Solo puedes girar una vez. Cerrando sesión...', 'info');
      setTimeout(()=>this.logout(), 2000);
      return;
    }

    this.girando = true;

    // Autenticación: token del localstorage
    const token = localStorage.getItem('token');

    this.http.post<any>(this.api, {}, {
      headers: {Authorization:  `Bearer ${token}` }
    }).subscribe({
      next: (res) =>{
        const index = Math.floor(Math.random() * 8); // reemplazar por lógica real
        const giroExtra = 360 * 6; // varias vueltas
        const premioIndex = index * (360 / 8);
        this.grados += giroExtra + (360 - premioIndex);

        setTimeout(()=>{
          this.girando = false;
          this.premioNombre = res.premio.nombre;

          Swal.fire({
            title: '¡Ganaste!',
            text: `Premio: ${res.premio.nombre}`,
            icon: 'success'
          });
        }, 4000);
      },
      error: (err) => {
        this.girando = false;
        Swal.fire('Error', err.error?.error || 'No se pudo girar la ruleta', 'error');
      },
    })

  }

}
