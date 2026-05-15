import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

// Validación personalizada: que el mensaje no contenga etiquetas <script>
function noScriptValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (value && /<script[\s\S]*?>[\s\S]*?<\/script>/gi.test(value)) {
    return { tieneScript: true };
  }
  // También bloquear etiquetas html sueltas
  if (value && /<[^>]*>/g.test(value)) {
    return { tieneHtml: true };
  }
  return null;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formulario: FormGroup;
  enviando: boolean = false;
  exitoso: boolean = false;
  errorEnvio: string = '';

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      // teléfono de 10 dígitos
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), noScriptValidator]]
    });
  }

  // Getters para acceder más fácil en el template
  get nombre() { return this.formulario.get('nombre'); }
  get email() { return this.formulario.get('email'); }
  get telefono() { return this.formulario.get('telefono'); }
  get mensaje() { return this.formulario.get('mensaje'); }

  enviar(): void {
    if (this.formulario.invalid) return;

    this.enviando = true;
    this.errorEnvio = '';

    // Simular llamada a una API (en un proyecto real sería un HTTP POST)
    setTimeout(() => {
      console.log('Datos del formulario:', this.formulario.value);
      this.enviando = false;
      this.exitoso = true;
      this.formulario.reset();

      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        this.exitoso = false;
      }, 5000);
    }, 1200);
  }
}
