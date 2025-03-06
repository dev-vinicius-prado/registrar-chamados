import { Injectable } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private imageCompress: NgxImageCompressService) { }

  compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        let quality = file.size > 2 * 1024 * 1024 ? 50 : 70;

        this.imageCompress.compressFile(event.target.result, -1, quality, quality)
          .then(compressed => resolve(compressed))
          .catch(err => reject(err));
      };
      reader.readAsDataURL(file);
    });
  }
}
