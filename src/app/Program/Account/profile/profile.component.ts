import { Component, OnInit } from '@angular/core';
import {  AccountService, AccountRecord } from '../../Service/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  AccService: AccountService;
  UserData: AccountRecord = {} as AccountRecord;

  constructor(AccService: AccountService) {
    this.AccService = AccService;
   }

  ngOnInit() {
    this.UserData = this.AccService.getUserInfo();
  }

}
