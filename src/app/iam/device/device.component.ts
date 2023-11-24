import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeviceService} from "../../services/device.service";
import {Observable, of} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {DeviceObject} from "../../shared/device.model";

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss'
})
export class DeviceComponent {

  constructor(private deviceService: DeviceService) {}

  devices$!: Observable<DeviceObject[]>

  ngOnInit() {
    this.getDevices()
  }
  getDevices() {
    this.devices$ = this.deviceService.getDevices().pipe(
      tap(devices => console.log(devices))
    );
  }

  delete(d: DeviceObject) {
    this.deviceService.deleteDevice(d.id).pipe(
      switchMap(r => {
        if (r.code == 200) {
          return this.deviceService.getDevices();
        }
        return of([]);
      }),
      tap(devices => console.log(devices))
    ).subscribe(devices => this.devices$ = of(devices));
  }
}
