import { Component } from '@angular/core';
import { Alquiler } from 'src/app/Modelo/alquiler';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';

@Component({
  selector: 'app-lista-alquileres',
  templateUrl: './lista-alquileres.component.html',
  styleUrls: ['./lista-alquileres.component.css'],
})
export class ListaAlquileresComponent {

  listaAlquileres: Alquiler[] = []; 

  constructor(
    private _firebaseService: FirebaseService,
    private _notificacionesService: NotificacionesService
  ) {}

  ngOnInit() {
    this.getAlquileres();
  }

  /**
   * Obtiene todos los alquileres registrados en firebase con dicho servicio
   * @returns suscripcion al observable
   */
  getAlquileres() {
    return this._firebaseService.obtenerTodos('alquileres').subscribe((alquileres: Alquiler[]) => {
      this.listaAlquileres = alquileres;
    });
  }

   /**
   * Elimina un alquiler llamando al servicio para confirmación de eliminación
   * @param id del aluiler a eliminar
   * @param nombreJuego del alquiler para mostrarlo en la notificación
   */
  eliminarAlquiler(id: string, nombreJuego: string) {
    this._notificacionesService.confirmarEliminar(id, nombreJuego, 'alquiler', 'alquileres');
  }
}
