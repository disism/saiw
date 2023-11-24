import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IpfsService} from "./ipfs.service";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ImageObject} from "../shared/image.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private ipfsServices: IpfsService,
    private http: HttpClient
  ) { }

  private api = `${environment.apiUrl}/_image/v1`

  add(file: FileList): Observable<ImageObject> {
    return this.ipfsServices.add(file).pipe(
      switchMap(r => {
        return new Observable(observer => {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            const image = new Image();
            image.onload = () => {
              const f = this.createFormData(image, r[0]);
              observer.next(f);
            };
            image.src = e.target.result;
          };
          reader.readAsDataURL(file[0]);
        });
      }),
      switchMap(formData => this.http.post<ImageObject>(`${this.api}`, formData))
    );
  }

  private createFormData(image: HTMLImageElement, fileInfo: { name: string, size: string, hash: string }): FormData {
    const formData = new FormData();
    formData.append("height", image.height.toString());
    formData.append("width", image.width.toString());
    formData.append("name", fileInfo.name);
    formData.append("size", fileInfo.size);
    formData.append("hash", fileInfo.hash);
    return formData;
  }

  getAddress(hash: string) {
    return `${this.ipfsServices.gateway()}/ipfs/${hash}`
  }
}
