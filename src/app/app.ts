import { Component, signal } from '@angular/core';
import { Registro } from './Registro/registro';
import { APIComponent } from './API-web/API';


@Component({
  selector: 'app-root',
  imports: [Registro,APIComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Home');
}

