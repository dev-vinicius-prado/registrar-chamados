import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CallService } from '../../services/call.service';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-register-call',
  templateUrl: './register-call.component.html',
  styleUrls: ['./register-call.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NgForOf, LayoutComponent],
})
export class RegisterCallComponent implements OnDestroy {
  @ViewChild('camera') videoElement!: ElementRef<HTMLVideoElement>;

  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = 'success';
  registerForm!: FormGroup;
  clients = ['Cliente A', 'Cliente B', 'Cliente C'];
  geolocation: string = 'Carregando...';
  videoStream: MediaStream | null = null;
  capturedPhoto: string | null = null;
  isCameraActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private callService: CallService,
    private router: Router
  ) {
    this.initForm();
    this.captureGeolocation();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      client: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async startCamera(): Promise<void> {
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      this.videoStream = await navigator.mediaDevices.getUserMedia(constraints);

      if (this.videoElement?.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.videoStream;
        this.isCameraActive = true;
      }
    } catch (error) {
      this.showToastMessage('Failed to access camera. Please check permissions.', 'error');
    }
  }

  capturePhoto(): void {
    if (!this.videoElement?.nativeElement || !this.isCameraActive) {
      this.showToastMessage('Camera is not active', 'error');
      return;
    }

    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.capturedPhoto = canvas.toDataURL('image/jpeg', 0.8);
      this.stopCamera();
    }
  }

  stopCamera(): void {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
      this.isCameraActive = false;
    }
  }

  private captureGeolocation(): void {
    if (!navigator.geolocation) {
      this.geolocation = 'Geolocation is not supported';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.geolocation = `${position.coords.latitude}, ${position.coords.longitude}`;
      },
      (error) => {
        const errorMessages: { [key: number]: string } = {
          1: 'Permission denied',
          2: 'Position unavailable',
          3: 'Timeout'
        };
        this.geolocation = errorMessages[error.code] || 'Unknown error';
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  onSubmit(): void {
    if (!this.registerForm.valid) {
      this.showToastMessage('Please fill in all required fields correctly.', 'warning');
      return;
    }

    const newCall = {
      cliente: this.registerForm.value.client,
      descricao: this.registerForm.value.description,
      foto: this.capturedPhoto || '',
      geolocalizacao: this.geolocation,
      dataHora: new Date().toISOString(),
      situacao: 'ABERTO',
    };

    this.callService.createCall(newCall)
      .then(() => this.showToastMessage('Call registered successfully!', 'success'))
      .catch(() => this.showToastMessage('Failed to register call.', 'error'));
  }

  showToastMessage(message: string, type: string): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
      if (type === 'success') {
        this.router.navigate(['/dashboard']);
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }
}
