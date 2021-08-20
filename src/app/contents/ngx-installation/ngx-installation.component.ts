import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-installation',
  templateUrl: './ngx-installation.component.html',
  styleUrls: ['./ngx-installation.component.scss']
})
export class NgxInstallationComponent implements OnInit {
  importModule = `
  import { NgxFitTextModule } from '@pikselin/ngx-fittext';
    @NgModule({
    imports: [
    // other modules
    NgxFitTextModule
    ]
  })
  `
  constructor() { }

  ngOnInit(): void {
  }

}
