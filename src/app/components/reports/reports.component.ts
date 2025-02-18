import autoTable from 'jspdf-autotable';
import { Component } from '@angular/core';
import { CallService } from '../../services/call.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { LayoutComponent } from '../layout/layout.component';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  imports: [LayoutComponent, NgFor, NgIf, DatePipe, ReactiveFormsModule],
})
export class ReportsComponent {
  calls: any[] = [];
  filteredCalls: any[] = [];
  reportType: string = 'period'; // Tipo de relatório selecionado
  filterForm: FormGroup;

  constructor(private callService: CallService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      reportType: ['period'], // Tipo de relatório selecionado
      startDate: [''],
      endDate: [''],
      client: [''],
      operator: [''],
    });
  }

  ngOnInit() {
    this.loadCalls();
  }

  loadCalls() {
    this.callService.getCalls().then((data) => {
      this.calls = data;
      this.filteredCalls = data;
    });
  }

  applyFilters() {
    const { reportType, startDate, endDate, client, operator } =
      this.filterForm.value;

    if (reportType === 'period') {
      const start = new Date(startDate);
      const end = new Date(endDate);
      this.filteredCalls = this.calls.filter((call) => {
        const callDate = new Date(call.dataHora);
        return callDate >= start && callDate <= end;
      });
    } else if (reportType === 'client') {
      this.filteredCalls = this.calls.filter((call) => call.cliente === client);
    } else if (reportType === 'operator') {
      this.filteredCalls = this.calls.filter(
        (call) => call.operador === operator
      );
    }
  }

  filterByPeriod(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    this.filteredCalls = this.calls.filter((call) => {
      const callDate = new Date(call.dataHora);
      return callDate >= start && callDate <= end;
    });
  }

  filterByClient(client: string) {
    this.filteredCalls = this.calls.filter((call) => call.cliente === client);
  }

  filterByOperator(operator: string) {
    this.filteredCalls = this.calls.filter(
      (call) => call.operador === operator
    );
  }

  getClients(): string[] {
    return [...new Set(this.calls.map((call) => call.cliente))];
  }

  getOperators(): string[] {
    return [...new Set(this.calls.map((call) => call.operador))];
  }

  exportToPDF() {
    const doc = new jsPDF();

    // Adicionar logo
    const logo = new Image();
    logo.src = 'assets/logo_1.png'; // Certifique-se de ter a logo no diretório assets
    doc.addImage(logo, 'PNG', 10, 10, 40, 20);

    // Adicionar título
    doc.setFontSize(18);
    doc.text('Relatório de Chamados', 60, 20);

    // Adicionar tabela
    const headers = [['Cliente', 'Descrição', 'Data-Hora', 'Situação']];
    const data = this.filteredCalls.map((call) => [
      call.cliente,
      call.descricao,
      call.dataHora,
      call.situacao,
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 40,
    });

    // Salvar PDF
    doc.save('relatorio-chamados.pdf');
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredCalls);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Chamados');

    // Salvar Excel
    XLSX.writeFile(workbook, 'relatorio-chamados.xlsx');
  }
}
