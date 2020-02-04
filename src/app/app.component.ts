import { Component } from '@angular/core';
import { MatIconRegistry  } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myproject';
  programName = 'index'; // 預設頁面是第一隻程式

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'angular',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/cli.svg'));
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {}

  show(item: string) {
    this.programName = item;
  }
}
