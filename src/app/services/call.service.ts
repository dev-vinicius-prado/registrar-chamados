import { Injectable } from '@angular/core';
import axios from 'axios';
import { ApiError } from '../models/apiError.types';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private apiUrl = 'https://67b3aab7392f4aa94fa7f285.mockapi.io/chamados';

  getCalls() {
    return axios.get(this.apiUrl).then((response) => response.data);
  }

  async createCall(newCall: {
    cliente: any;
    descricao: any;
    foto: string;
    geolocalizacao: string;
    dataHora: string;
    situacao: string;
  }) {
    try {
      const response = await axios.post(this.apiUrl, newCall);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: ApiError = {
          message: error.response?.data?.message || 'Failed to create call',
          statusCode: error.response?.status || 500
        };
        throw apiError;
      }
      throw { message: 'An unexpected error occurred', statusCode: 500 };
    }
  }

  updateCall(id: string, updatedData: any) {
    return axios.put(`${this.apiUrl}/${id}`, updatedData);
  }
}
