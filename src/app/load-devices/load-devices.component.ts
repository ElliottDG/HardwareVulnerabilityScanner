import { Component, Type, ViewChild } from '@angular/core';
import { WebHidService } from '../services/web-hid.service';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { switchMap } from 'rxjs';
import { ProductData } from 'src/interfaces/product-data';
import { AllProducts } from 'src/interfaces/all-products';
import { DeviceData } from 'src/interfaces/device-data';
import { Vendors } from 'src/interfaces/vendors';
import { Cve } from 'src/interfaces/cve';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-load-devices',
  templateUrl: './load-devices.component.html',
  styleUrls: ['./load-devices.component.scss'],
})
export class LoadDevicesComponent {
  // stringSimilarity = require('string-similarity');
  dataSource: DeviceData[] = [];
  displayedColumns: string[] = [
    'deviceNumber',
    'deviceName',
    'vendorId',
    'productId',
  ];
  deviceNumber: number = 1;
  addedDevices: number[] = [];
  cveDBData: Cve[] = [];
  NVDLINK = 'https://nvd.nist.gov/vuln/detail/';
  WARNINGMESSAGE =
    'Devices that break validation or do not exist in the table of USB vendors will be omitted.';

  @ViewChild(MatTable) table!: MatTable<DeviceData[]>;

  constructor(
    private webHidService: WebHidService,
    private router: Router,
    private backend: BackendService,
    public spinnerService: SpinnerService
  ) {}

  intTo4Hex(num: number): string {
    let retNum: string = '';
    return (retNum = num.toString(16).padStart(4, '0'));
  }

  loadDevices(): void {
    this.webHidService.requestDevice().then((devices) => {
      if (this.addedDevices.includes(devices.productId)) {
      } else {
        if (devices) {
          for (let i = 0; i < devices.length; i++) {
            if (this.addedDevices.includes(devices[i].productId)) {
              continue;
            }
            const dataItem: DeviceData = {
              deviceNumber: this.deviceNumber,
              deviceName: devices[i].productName,
              vendorId: devices[i].vendorId,
              productId: devices[i].productId,
            };
            // Add the dataItem to the dataSource array
            this.addedDevices.push(devices[i].productId);
            this.dataSource.push(dataItem);
            this.deviceNumber++;
            this.table.renderRows();
          }
        }
      }
    });
  }

  clearDevices(): void {
    this.dataSource = [];
    this.deviceNumber = 1;
    this.table.renderRows();
    window.location.reload(); // only way to reset webhid :/
  }

  async scanData(): Promise<void> {
    let vendorsNum: number[] = this.dataSource.map((item) => item.vendorId);
    let vendorsJSON = { ids: vendorsNum };
    let vendors: any;
    let vulnerabilities: any;

    this.backend
      .post('USB/vendors', vendorsJSON)
      .pipe(
        switchMap((data) => {
          vendors = data;
          let allProducts: AllProducts = { devices: [] };
          let dataItem: ProductData;
          for (let i = 0; i < this.dataSource.length; i++) {
            const id = this.intTo4Hex(this.dataSource[i].vendorId);
            const vendor = vendors.find(
              (item: Vendors) => item.vendorids === id
            )?.vendornames;
            dataItem = {
              vendor: vendor || '',
              product: this.dataSource[i].deviceName,
            };
            allProducts.devices.push(dataItem);
          }
          // allProducts.devices.push({
          //   vendor: 'HP, Inc',
          //   product: 'Officejet Pro 8500',
          // });
          return this.backend.post('CVE/Vulnerabilities', allProducts);
        })
      )
      .subscribe({
        next: (data) => {
          vulnerabilities = data;
          console.log(vulnerabilities);
          if (vulnerabilities === null || vulnerabilities.data.length < 1) {
          } else {
            for (let i = 0; i < vulnerabilities.data.length; i++) {
              let tabledata: Cve = {
                finding: vulnerabilities.data[i].cveData.id,
                device: vulnerabilities.data[i].product,
                severity: parseFloat(vulnerabilities.data[i].cveData.cvss.v2),
                cveLink: this.NVDLINK + vulnerabilities.data[i].cveData.id,
                cwe: vulnerabilities.data[i].cveData.cwes[0],
                status: vulnerabilities.data[i].vulnerable
                  ? 'Vulnerable'
                  : 'Not Vulnerable',
              };
              this.cveDBData.push(tabledata);
            }
          }
          if (vulnerabilities === null) {
            this.router.navigate(['/ScanResults']);
          } else {
            this.router.navigate(['/ScanResults'], {
              state: { data: this.cveDBData, id: vulnerabilities.id },
            });
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  toScanResults(): void {
    this.scanData();
  }
}
