import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Zodiaco} from './formularios/zodiaco/zodiaco';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Zodiaco],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('SegundoParcialAngular');
   ngOnInit(): void {
    initFlowbite();
  }
}
