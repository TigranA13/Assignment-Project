import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigureComponent } from './configure/configure.component';
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'configure' },
  { path: 'configure', component: ConfigureComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: 'configure'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
