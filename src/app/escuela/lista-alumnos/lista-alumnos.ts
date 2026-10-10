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
  indiceEdition:number=1

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

  agregarAlumno():void{
    if(
      this.nuevoAlumno.matricula === '' ||
      this.nuevoAlumno.nombre === '' ||
      this.nuevoAlumno.correo === '' ||
      this.nuevoAlumno.materia === '' ||
    ){
      alert('Todos los campos son obligatorios');
      return;
    }
    
    if (this.indiceEdition !== -1){
      this.alumnos[this.indiceEdition]={
        ...this.nuevoAlumno
      }
    }else{
      this.alumnos.push({...this.nuevoAlumno})
    }
   

  localStorage.setItem(
    'alumnos',
    JSON.stringify(this.alumnos)
  )
   this.limpiarCampos()
}

  muestraAlumnos():void{
    
    this.nuevoAlumno.matricula= this.formulario.value.matricula
    this.nuevoAlumno.nombre= this.formulario.value.nombre
    this.nuevoAlumno.correo= this.formulario.value.correo
    this.nuevoAlumno.materia= this.formulario.value.materia
    this.agregarAlumno()
  }

  cargarAlumnos():void{
     const datos = localStorage.getItem('alumnos');

     if(datos){
      this.alumnos = JSON.parse(datos);
     }
  }

  editarAlumnos(index:number):void{
    this.nuevoAlumno={
      ...this.alumnos[index]
    }
    const alumno=this.alumnos[index]
    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    })
    this.indiceEdition=index
  }

  eliminarAlumno(index:number): void{
    this.alumnos.splice(index,1)
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    )
  }

  limpiarCampos():void{
    this.nuevoAlumno={
      matricula:'',
      nombre:'',
      correo:'',
      materia:''
    }
    this.indiceEdition=-1
  }
}
