import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error instanceof HttpErrorResponse) {
      // Server or connection error
      if (!navigator.onLine) {
        errorMessage = 'No Internet connection';
      } else {
        errorMessage = error.status === 0
          ? 'Server is not responding'
          : `${error.status} - ${error.error?.message || error.statusText}`;
      }
    } else {
      // Client-side error
      errorMessage = error.message || errorMessage;
    }

    console.error('Error:', error);
    return throwError(() => errorMessage);
  }
}
