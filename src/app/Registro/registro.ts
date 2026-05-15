import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

formularioRegistro: FormGroup;
enviado: boolean = false;

constructor(private fb: FormBuilder) {
  this.formularioRegistro = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(6)]]
  });
}

get nombre() {
  return this.formularioRegistro.get('nombre');
}
get email() {
  return this.formularioRegistro.get('email');
}
get phone() {
  return this.formularioRegistro.get('phone');
} 

enviarRegistro(): void {
  if (this.formularioRegistro.valid) {
    this.enviado = true;
    console.log('Formulario válido, datos enviados:', this.formularioRegistro.value);
    this.formularioRegistro.reset();
    // Equivalente a un await Task.Delay(3000) no bloqueante
    setTimeout(() => {
      this.enviado = false; console.log('El mensaje de éxito debería desaparecer ahora');
    }, 3000); // 3000 milisegundos = 3 segundos
  }
}
}

