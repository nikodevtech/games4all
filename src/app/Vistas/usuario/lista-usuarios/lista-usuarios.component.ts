import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Usuario } from 'src/app/Modelo/usuario';
import { FirebaseService } from 'src/app/Servicios/firebase.service';
import { NotificacionesService } from 'src/app/Servicios/notificaciones.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent {
  
  listaUsuarios: Usuario[] = [];

  constructor(
    private _firebaseService: FirebaseService,
    private _notificacionesService: NotificacionesService
    ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  /**
   * Obtiene todos los juegos registrados en firebase con dicho servicio
   * @returns suscripcion al observable
   */
  getUsuarios() {
    return this._firebaseService.obtenerTodos('usuarios').subscribe((usuarios : Usuario[]) => {
      this.listaUsuarios = usuarios;
    });
  }

  /**
   * Elimina un juego llamando al servicio para confirmar la eliminación
   * @param id del juego a eliminar
   */
  eliminarUsuario(id: string, dni: string): void {
    this._notificacionesService.confirmarEliminar(id, dni, 'usuario', 'usuarios');
  }

}
