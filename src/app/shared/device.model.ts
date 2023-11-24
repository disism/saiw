export interface DevicesModel{
  code: number,
  devices: DeviceModel[]
}

export interface DeviceModel{
  id: string;
  create_time: string;
  update_time: string;
  ip: string;
  device: string;
}

