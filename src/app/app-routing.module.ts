import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppauthGuard } from './guard/appauth.guard';

import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [ 

{ path: '',  component: AppComponent, canActivate: [AppauthGuard] },
{path :'' , component : SidebarComponent ,}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
