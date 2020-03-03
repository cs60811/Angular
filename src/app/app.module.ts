import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule , MatToolbarModule  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule , MatListModule , MatMenuModule , MatDatepickerModule , MatNativeDateModule } from '@angular/material';
import { MAT_DATE_FORMATS , MAT_DATE_LOCALE , MatSelectModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ReservationComponent } from './reservation/reservation.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './Program/index/index.component';
import { PlaceComponent } from './Program/place/place.component';
import { SearchComponent } from './Program/search/search.component';
import { PlacedetailComponent } from './Program/placedetail/placedetail.component';
import { ProfileComponent } from './Program/Account/profile/profile.component';
import { LoginComponent } from './Program/Account/login/login.component';



export const TW_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD'
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY MMM'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    // ReservationComponent,
    IndexComponent,
    PlaceComponent,
    SearchComponent,
    PlacedetailComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule ,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule



  ],
  exports: [ RouterModule ],
  providers: [MatDatepickerModule ,
              { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
              { provide: MAT_DATE_FORMATS, useValue: TW_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }


