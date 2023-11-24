import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, switchMap} from "rxjs";
import {AddImageResponseModel} from "../shared/image.model";
import {IpfsService} from "./ipfs.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
    private ipfsServices: IpfsService,
  ) { }

  private api = `${environment.apiUrl}/_images/v1`

  add(file: FileList): Observable<AddImageResponseModel> {
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
      switchMap(formData => this.http.post<AddImageResponseModel>(`${this.api}`, formData))
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

}
