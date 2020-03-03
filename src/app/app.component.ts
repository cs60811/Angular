import { Component, OnInit } from '@angular/core';
import { MatIconRegistry  } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountService, AccountRecord } from './Program/Service/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  title = 'myproject';
  programName = 'index'; // 預設頁面是第一隻程式
  AccService: AccountService;
  UserData: AccountRecord = {} as AccountRecord;


  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer , AccService: AccountService) {
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'angular',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/cli.svg'));
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    this.AccService = AccService;
  }


  ngOnInit() {
    this.UserData = this.AccService.getUserInfo();
  }

  show(item: string) {
    this.programName = item;
  }

  logout() {
    if (confirm('確定要登出?')){
      this.AccService.clearUserInfo();
      this.UserData = this.AccService.getUserInfo();
    }

  }






}
