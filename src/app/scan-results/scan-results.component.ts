import { Component, Input, ViewChild } from '@angular/core';
import { single } from '../data';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GraphData } from 'src/interfaces/graph-data';
import { MatDialog } from '@angular/material/dialog';
import { AcceptRiskComponent } from '../dialogs/accept-risk/accept-risk.component';
import { BackendService } from '../services/backend.service';
import { Cve } from 'src/interfaces/cve';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss'],
})
export class ScanResultsComponent {
  graphData: GraphData[] = single;
  numOfVulnerabilities: number = 0;
  @ViewChild(MatTable) table!: MatTable<any>;

  CWELINK: string = 'https://cwe.mitre.org/data/definitions/';
  NVDLINK: string = 'https://nvd.nist.gov/vuln/detail/';

  domain = ['#A10A28', '#C7B42C', '#5AA454', '#AAAAAA'];

  colorScheme: Color = {
    domain: this.domain,
    name: 'Vulnerabilities',
    selectable: false,
    group: ScaleType.Ordinal,
  };

  scanID: number = 0;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private backendService: BackendService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const state = this.router.getCurrentNavigation()?.extras.state ?? {};
        // Concatenate elements of 'data' to 'dataSource'
        this.dataSource.data = state['data'];
        this.scanID = state['id'];
        this.numOfVulnerabilities = this.dataSource.data.length;
        this.populateChart(this.dataSource.data);
      });
  }

  getCWENumber(cwe: string): string {
    return cwe.slice(4);
  }

  populateChart(data: any): void {
    let critical = 0;
    let medium = 0;
    let low = 0;
    let remediated = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === 'Not Vulnerable') {
        remediated++;
      } else {
        if (data[i].severity >= 7) {
          critical++;
        } else if (data[i].severity >= 4) {
          medium++;
        } else if (data[i].severity >= 1) {
          low++;
        }
      }
    }
    this.graphData = [
      { name: 'Critical', value: critical },
      { name: 'Medium', value: medium },
      { name: 'Low', value: low },
      { name: 'Remediated', value: remediated },
    ];
  }

  acceptRisk(cve: string): void {
    const dialog = this.dialog.open(AcceptRiskComponent, {
      data: { cve: cve, scanID: this.scanID },
    });
    let vulnerabilities: any;
    dialog.afterClosed().subscribe((result) => {
      this.backendService.get(`Scan/scanData/${this.scanID}`).subscribe({
        next: (data) => {
          vulnerabilities = data;
          console.log(vulnerabilities);
          let cveDBData: Cve[] = [];
          for (let i = 0; i < vulnerabilities.length; i++) {
            let tabledata: Cve = {
              finding: vulnerabilities[i].ScanData.cveData.id,
              device: vulnerabilities[i].ScanData.product,
              severity: parseFloat(vulnerabilities[i].ScanData.cveData.cvss.v2),
              cveLink: this.NVDLINK + vulnerabilities[i].ScanData.cveData.id,
              cwe: vulnerabilities[i].ScanData.cveData.cwes[0],
              status: vulnerabilities[i].ScanData.vulnerable
                ? 'Vulnerable'
                : 'Not Vulnerable',
            };
            cveDBData.push(tabledata);
          }
          this.dataSource.data = cveDBData;
          this.numOfVulnerabilities = this.dataSource.data.length;
          // god knows why this has to be done twice
          this.table.renderRows();
          this.table.renderRows();
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  }

  view: [number, number] = [650, 165];
  gradient: boolean = true;
  animations: boolean = true;
  displayedColumns: string[] = [
    'finding',
    'device',
    'severity',
    'primaryCwe',
    'status',
    'acceptRisk',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
}
