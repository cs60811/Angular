import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './Program/index/index.component';
import { PlaceComponent } from './Program/place/place.component';
import { SearchComponent } from './Program/search/search.component';
import { PlacedetailComponent } from './Program/placedetail/placedetail.component';
import { LoginComponent } from './Program/Account/login/login.component';
import { ProfileComponent } from './Program/Account/profile/profile.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'place', component: PlaceComponent },
  { path: 'search', component: SearchComponent },
  { path: 'placedetail/:PlaceID', component: PlacedetailComponent },
  { path: 'Account/Login', component: LoginComponent },
  { path: 'Account/Profile/:SID', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
