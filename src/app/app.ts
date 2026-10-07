import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import {Zodiaco} from './formularios/zodiaco/zodiaco';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import {Navbar} from './navbar/navbar'
//import {Usuario} from './formularios/usuario/usuario'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('SegundoParcialAngular');
   ngOnInit(): void {
    initFlowbite();
  }
}
