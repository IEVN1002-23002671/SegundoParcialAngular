import { Component , OnInit} from '@angular/core';
import {IAlumnos} from '../alumnos';
import {FormGroup,FormControl,FormsModule,ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-lista-alumnos',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css',
})
export class ListaAlumnos implements OnInit{
  formulario:FormGroup

  alumnos: IAlumnos[]=[]
  nuevoAlumno:IAlumnos={
    matricula:'ss',
    nombre:'ss',
    correo:'xx',
    materia:'xx'
  }

  ngOnInit():void{

    this.cargarAlumno()
    
    this.formulario=new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    });
  }
  muestraAlumnos():void{
    
    this.nuevoAlumno.matricula= this.formulario.value.matricula
    this.nuevoAlumno.nombre= this.formulario.value.nombre
    this.nuevoAlumno.correo= this.formulario.value.correo
    this.nuevoAlumno.materia= this.formulario.value.materia
  }

  cargarAlumno():void{

  }
}
