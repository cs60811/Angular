import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './Program/index/index.component';
import { PlaceComponent } from './Program/place/place.component';


const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'place', component: PlaceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
