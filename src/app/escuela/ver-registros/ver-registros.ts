import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-registros',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ver-registros.html',
  styleUrl: './ver-registros.css',
})
export class VerRegistros implements OnInit {

  registros: any[] = [];

  formulario!: FormGroup;

  indiceEdicion: number = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(1),
      cantidad: new FormControl(1),
      tarjeta: new FormControl('no')
    });

    this.cargarRegistros();
  }

  cargarRegistros(): void {

    const datos = localStorage.getItem('registros');

    if (datos) {
      this.registros = JSON.parse(datos);
    }

  }

  editarRegistro(index: number): void {

    const venta = this.registros[index];

    this.formulario.patchValue({
      nombre: venta.nombre,
      compradores: venta.compradores,
      cantidad: venta.cantidad,
      tarjeta: venta.tarjeta
    });

    this.indiceEdicion = index;

  }

  guardarCambios(): void {

    let compradores = Number(this.formulario.value.compradores);
    let cantidad = Number(this.formulario.value.cantidad);

    let maximoBoletos = compradores * 7;

    if (
      this.formulario.value.nombre.trim() === '' ||
      compradores < 1 ||
      cantidad < 1 ||
      cantidad > maximoBoletos
    ) {
      alert('Verifica los datos. Máximo 7 boletos por comprador.');
      return;
    }

    let total = cantidad * 12;

    switch (true) {

      case (cantidad > 5):
        total = total - (total * 0.15);
        break;

      case (cantidad >= 3):
        total = total - (total * 0.10);
        break;

    }

    if (this.formulario.value.tarjeta === 'si') {
      total = total - (total * 0.10);
    }

    this.registros[this.indiceEdicion] = {
      nombre: this.formulario.value.nombre,
      compradores: compradores,
      cantidad: cantidad,
      tarjeta: this.formulario.value.tarjeta,
      valor: total
    };

    localStorage.setItem(
      'registros',
      JSON.stringify(this.registros)
    );

    this.cancelarEdicion();

  }

  cancelarEdicion(): void {

    this.indiceEdicion = -1;

    this.formulario.reset({
      nombre: '',
      compradores: 1,
      cantidad: 1,
      tarjeta: 'no'
    });

  }

  eliminarRegistro(index: number): void {

    this.registros.splice(index, 1);

    localStorage.setItem(
      'registros',
      JSON.stringify(this.registros)
    );

    if (this.indiceEdicion === index) {
      this.cancelarEdicion();
    } else if (this.indiceEdicion > index) {
      this.indiceEdicion--;
    }

  }

  regresar(): void {
    this.router.navigate(['/formulario/cinepolis']);
  }

}