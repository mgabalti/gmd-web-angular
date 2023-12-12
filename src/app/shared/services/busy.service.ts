import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

    numberOfBusyRequests: number = 0;
    numberOfNonBusyRequests: number = 0;

    // Observable navItem source
    private _busySource = signal<boolean>(false);
    busy$ = this._busySource;
    constructor() { }

    public changeBusy(val: boolean) {

        if ((val == true)) {
            this.numberOfBusyRequests = this.numberOfBusyRequests + 1;
        }
        else {
            this.numberOfNonBusyRequests = this.numberOfNonBusyRequests + 1;
        }

        if (this.numberOfBusyRequests == this.numberOfNonBusyRequests) {
            this._busySource.set(false);
        }
        else {
            this._busySource.set(true);
        }

    }
}