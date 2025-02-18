import { Component, OnInit } from '@angular/core';
import { CallService } from '../../services/call.service';
import { DatePipe, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, DatePipe, LayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  calls: any[] = [];
  filteredCalls: any[] = [];
  filter: string = 'TODOS';

  constructor(private _callService: CallService, private router: Router) {}
  ngOnInit(): void {
    this.loadCalls();
  }
  loadCalls() {
    this._callService.getCalls().then((data) => {
      this.calls = data;
      this.filteredCalls = data;
    });
  }

  applyFilter() {
    if (this.filter === 'TODOS') {
      this.filteredCalls = this.calls;
    } else {
      this.filteredCalls = this.calls.filter(
        (call) => call.situacao === this.filter
      );
    }
  }

  updateCallStatus(callId: string, newStatus: string) {
    const call = this.calls.find((c) => c.id === callId);
    if (call) {
      this._callService.updateCall(callId, { situacao: newStatus }).then(() => {
        call.situacao = newStatus;
        this.applyFilter();
      });
    }
  }

  detailCall(callId: any) {
    this.router.navigate(['/details', callId]);
  }
}
