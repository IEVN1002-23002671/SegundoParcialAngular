import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css',
  imports: [FormsModule]
})

export class Zodiaco {
nombre: string = '';
apaterno: string = '';
amaterno: string = '';

dia: string = '';
mes: string = '';
anio: string = '';

sexo: string = '';

edad: number=0;
sigzodiacal: string = '';
imagen: string = '';


 obtener(): void {


let fecha = new Date();
let anioActual = fecha.getFullYear();

this.edad = anioActual - parseInt(this.anio);

if (parseInt(this.mes) > fecha.getMonth() + 1) {
  this.edad--;
}

    let resultado = (parseInt(this.anio) - 4) % 12;

    if (resultado == 0) {
      this.sigzodiacal = 'Rata';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/rata.jpg';
    }
    else if (resultado == 1) {
      this.sigzodiacal = 'Buey';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/buey.jpg';
    }
    else if (resultado == 2) {
      this.sigzodiacal = 'Tigre';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/tigre.jpg';
    }
    else if (resultado == 3) {
      this.sigzodiacal = 'Conejo';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/conejo.jpg';
    }
    else if (resultado == 4) {
      this.sigzodiacal = 'Dragón';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/dragon.jpg';
    }
    else if (resultado == 5) {
      this.sigzodiacal = 'Serpiente';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/serpiente.jpg';
    }
    else if (resultado == 6) {
      this.sigzodiacal = 'Caballo';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/caballo.jpg';
    }
    else if (resultado == 7) {
      this.sigzodiacal = 'Cabra';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/cabra.jpg';
    }
    else if (resultado == 8) {
      this.sigzodiacal = 'Mono';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/mono.jpg';
    }
    else if (resultado == 9) {
      this.sigzodiacal = 'Gallo';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/gallo.jpg';
    }
    else if (resultado == 10) {
      this.sigzodiacal = 'Perro';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/perro.jpg';
    }
    else if (resultado == 11) {
      this.sigzodiacal = 'Cerdo';
      this.imagen = 'https://www.horoscopochino.eu/assets/img/zodiaco/s/cerdo.jpg';
    }



 } 

}
