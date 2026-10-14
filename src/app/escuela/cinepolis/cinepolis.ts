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
  selector: 'app-cinepolis',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css',
})
export class Cinepolis implements OnInit {

  formulario!: FormGroup;

  nuevaVenta = {
    nombre: '',
    compradores: 0,
    cantidad: 0,
    tarjeta: '',
    valor: 0
  };

  mensaje = '';

  // Guarda el índice de la venta que se va a editar
  indiceEdicion: number = -1;

  // Permite cambiar de componente
  constructor(private router: Router) {}

  ngOnInit(): void {

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(1),
      cantidad: new FormControl(1),
      tarjeta: new FormControl('no')
    });

    // Revisar si se seleccionó una venta para editar
    const indice = localStorage.getItem('indiceVentaEditar');

    if (indice !== null) {

      this.indiceEdicion = Number(indice);

      const registros = JSON.parse(
        localStorage.getItem('registros') || '[]'
      );

      const venta = registros[this.indiceEdicion];

      if (venta) {
        this.formulario.patchValue({
          nombre: venta.nombre,
          compradores: venta.compradores,
          cantidad: venta.cantidad,
          tarjeta: venta.tarjeta
        });
      }
    }
  }

  muestraCine(): void {

    let compradores = Number(this.formulario.value.compradores);
    let cantidad = Number(this.formulario.value.cantidad);

    // Máximo de boletos por comprador
    let maximoBoletos = compradores * 7;

    if (cantidad > maximoBoletos) {
      this.mensaje =
        'No se pueden comprar más de 7 boletos por persona.';
      this.nuevaVenta.valor = 0;
      return;
    }

    // Validar datos
    if (cantidad < 1 || compradores < 1) {
      this.mensaje = 'Los datos deben ser mayores a 0.';
      this.nuevaVenta.valor = 0;
      return;
    }

    this.mensaje = '';

    this.nuevaVenta.nombre = this.formulario.value.nombre;
    this.nuevaVenta.compradores = compradores;
    this.nuevaVenta.cantidad = cantidad;
    this.nuevaVenta.tarjeta = this.formulario.value.tarjeta;

    let total = cantidad * 12;

    // Descuento por cantidad de boletos
    switch (true) {

      case (cantidad > 5):
        total = total - (total * 0.15);
        break;

      case (cantidad >= 3):
        total = total - (total * 0.10);
        break;

    }

    // Descuento por tarjeta Cineco
    if (this.formulario.value.tarjeta == 'si') {
      total = total - (total * 0.10);
    }

    this.nuevaVenta.valor = total;

    // Obtener los registros guardados
    let registros = JSON.parse(
      localStorage.getItem('registros') || '[]'
    );

    // Guardar una venta nueva o actualizar una existente
    if (this.indiceEdicion !== -1) {

      registros[this.indiceEdicion] = { ...this.nuevaVenta };

      localStorage.removeItem('indiceVentaEditar');

      this.indiceEdicion = -1;

      this.mensaje = 'Venta actualizada correctamente.';

    } else {

      registros.push({ ...this.nuevaVenta });

      this.mensaje = 'Venta registrada correctamente.';

    }

    // Guardar los cambios
    localStorage.setItem(
      'registros',
      JSON.stringify(registros)
    );

  }

  // Abrir el componente VerRegistros
  veregistro(): void {
    this.router.navigate(['/formulario/ver-registros']);
  }

}