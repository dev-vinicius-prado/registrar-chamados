import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private apiUrl = 'https://67b3aab7392f4aa94fa7f285.mockapi.io/chamados'; // Substitua pela sua URL

  getCalls() {
    return axios.get(this.apiUrl).then((response) => response.data);
  }

  updateCall(id: string, updatedData: any) {
    return axios.put(`${this.apiUrl}/${id}`, updatedData);
  }
}
