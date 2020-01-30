import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

import * as moment from 'moment'; // add this 1 of 4




@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})


export class PlaceComponent implements OnInit {
  isLinear: boolean;
  basicFormGroup: FormGroup;
  StepOneQuestion: FormGroup;
  countries$: any;

  minDate = new Date().toISOString();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString();
  constructor(private httpClient: HttpClient , private sanitized: DomSanitizer) {

    this.basicFormGroup = new FormGroup({
      StepOneQuestion : new FormGroup({
        name: new FormControl('', Validators.required),
        NickName: new FormControl('', Validators.required),
        Tel: new FormControl('', Validators.required),
        Sex: new FormControl('', Validators.required)
      }),
      StepTwoQuestion : new FormGroup({
        Place: new FormControl('', Validators.required),
        Date: new FormControl('', Validators.required),
        Time: new FormControl('', Validators.required)
      })
    });

  }
  ngOnInit() {
    this.countries$ = this.httpClient.get<any[]>('assets/countries.json');

    this.basicFormGroup
      .get('StepTwoQuestion')
      .get('Place')
      .valueChanges.pipe(debounceTime(300))
      .subscribe(inputCountry => {
        this.countries$ = this.httpClient.get<any[]>('assets/countries.json')
        .pipe(map(countries$ => {
          return countries$.filter(country => country.name.indexOf(inputCountry) >= 0);
        }));
      });

  }


  highlightFiltered(countryName: string) {
    const inputCountry = this.basicFormGroup.get('StepTwoQuestion').get('Place').value;
    return this.transform(countryName.replace(inputCountry, '<span >' + inputCountry + '</span>'));
  }


  /*highlightFiltered(countryName: string) {
    const inputCountry = this.basicFormGroup.get('StepTwoQuestion').get('Place').value;
    return this.transform(countryName.replace(inputCountry, '<span style="font-weight: bold;">' + inputCountry + '</span>'));
  }
  */
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);
    this.basicFormGroup.reset();
  }


}
