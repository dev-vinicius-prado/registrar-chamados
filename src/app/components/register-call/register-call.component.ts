import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CallService } from '../../services/call.service';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-register-call',
  templateUrl: './register-call.component.html',
  styleUrls: ['./register-call.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,NgIf, NgFor, NgForOf, LayoutComponent],
})
export class RegisterCallComponent {
  registerForm: FormGroup;
  clients = ['Cliente A', 'Cliente B', 'Cliente C'];
  geolocation: string = 'Carregando...';
  videoStream: MediaStream | null = null; // Armazena o stream da câmera
  capturedPhoto: string | null = null; // Armazena a foto capturada

  constructor(
    private fb: FormBuilder,
    private callService: CallService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      client: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.captureGeolocation();
  }

  captureGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.geolocation = `${position.coords.latitude}, ${position.coords.longitude}`;
        },
        (error) => {
          this.geolocation = 'Erro ao capturar geolocalização';
        }
      );
    } else {
      this.geolocation = 'Geolocalização não suportada';
    }
  }

  async startCamera() {
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const videoElement = document.getElementById(
        'camera'
      ) as HTMLVideoElement;
      if (videoElement) {
        videoElement.srcObject = this.videoStream;
      }
    } catch (error) {
      alert('Erro ao acessar a câmera: ' + error);
    }
  }

  capturePhoto() {
    const videoElement = document.getElementById('camera') as HTMLVideoElement;
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      this.capturedPhoto = canvas.toDataURL('image/png'); // Converte para base64
    }
  }

  stopCamera() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
    }
  }

  onSubmit() {
    if (this.registerForm.valid && this.capturedPhoto) {
      const newCall = {
        cliente: this.registerForm.value.client,
        descricao: this.registerForm.value.description,
        foto: this.capturedPhoto,
        geolocalizacao: this.geolocation,
        dataHora: new Date().toISOString(),
        situacao: 'ABERTO',
      };

      this.callService.createCall(newCall).then(
        () => {
          alert('Chamado registrado com sucesso!');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          alert('Erro ao registrar o chamado.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
  getBack() { // Armazena a foto capturada
   this.router.navigate(['/dashboard'])
  }
}
