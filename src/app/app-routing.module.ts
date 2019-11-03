import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertionComponent } from './insertion/insertion.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path : 'insertion', component : InsertionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
