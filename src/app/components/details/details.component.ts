import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallService } from '../../services/call.service';
import { DatePipe, NgIf } from '@angular/common';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-details',
  imports: [DatePipe, NgIf, LayoutComponent],
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class CallDetailsComponent implements OnInit {
  call: any = {};
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: string = 'success'; // 'success' ou 'error'

  constructor(
    private route: ActivatedRoute,
    private callService: CallService,
    private router: Router
  ) {}

  ngOnInit() {
    const callId = this.route.snapshot.paramMap.get('id');
    if (callId) {
      this.loadCallDetails(callId);
    }
  }

  loadCallDetails(callId: string) {
    this.callService.getCalls().then((calls) => {
      this.call = calls.find((c: any) => c.id === callId);
    });
  }

  updateCallStatus(newStatus: string) {
    this.callService.updateCall(this.call.id, { situacao: newStatus }).then(
      () => {
        this.call.situacao = newStatus;
        this.showToastMessage('Situação atualizada com sucesso!', 'success');
      },
      (error) => {
        this.showToastMessage('Erro ao atualizar a situação.', 'error');
      }
    );
  }

  showToastMessage(message: string, type: string) {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    // Esconde o toast após 3 segundos
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  getBack() {
    this.router.navigate(['/dashboard']);
  }
}
