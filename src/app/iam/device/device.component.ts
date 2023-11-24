import { Component } from '@angular/core';
import {DeviceService} from "../../services/device.service";
import {Observable, of, switchMap, tap} from "rxjs";
import {DeviceModel, DevicesModel} from "../../shared/device.model";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss'
})

export class DeviceComponent {
  constructor(
    private deviceService: DeviceService
  ) { }

  device$!: Observable<DevicesModel>

  ngOnInit() {
    this.getDevices()
  }

  getDevices(): Observable<DevicesModel> {
    this.device$ = this.deviceService.ls().pipe(
      tap(r => console.log(r)),
    );
    return this.device$;
  }

  logout(d: DeviceModel) {
    this.deviceService.delete(d.id).pipe(
      switchMap(r => {
        if (r.code == 200) {
          return this.getDevices();
        }
        return of({} as DevicesModel);
      }),
      tap(devices => console.log(devices))
    ).subscribe(devices => this.device$ = of(devices));
  }


}
