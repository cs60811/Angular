import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {  AccountService, AccountRecord } from '../../Service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

export class LoginComponent implements OnInit {
  basicFormGroup: FormGroup;
  UserData: AccountRecord = {} as AccountRecord;

  AccService: AccountService;

  constructor(AccService: AccountService) {
    this.basicFormGroup = new FormGroup({
        Account: new FormControl('', Validators.required),
        Password: new FormControl('', Validators.required)
    });
    this.AccService = AccService;
  }

  ngOnInit() {
  }

  /**
   * FB函式庫引入
   */
  FbLibrary() {

    (window as any).fbAsyncInit = function() {
      window['FB'].init({
        appId      : '172203210869103',
        cookie     : true,
        xfbml      : true,
        version    : 'v6.0'
      });
      window['FB'].AppEvents.logPageView();
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return; }
       js = d.createElement(s); js.id = id;
       js.src = 'https://connect.facebook.net/en_US/sdk.js';
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

  }

  /**
   * FB登入事件
   */
  FBlogin() {

    window['FB'].login((response) => {
        console.log('login response', response);
        if (response.authResponse) {

          window['FB'].api('/me', {
            fields: 'last_name,first_name,email'
          }, (userInfo) => {

            console.log("user information");
            console.log(userInfo);
            this.UserData.Name = userInfo.last_name + ' ' + userInfo.first_name;
            console.log(this.UserData);
          });

        } else {
          console.log('User login failed');
        }
    }, {scope: 'email'});
  }

  onSubmit(customerData) {
    // 只支援FB登入


    this.UserData.Name = 'Cheng Kang';
    this.UserData.SID = '1111111';
    this.UserData.ID = 'asds213';
    this.UserData.Email = 'test@gg.com.tw';
    this.UserData.Sex = '男';


    this.AccService.setUserInfo(this.UserData);
    alert('目前只支援FB登入!');
  }

}
