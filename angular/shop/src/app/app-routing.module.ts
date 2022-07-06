import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddAccountComponent } from './add-account/add-account.component';
import { BasketComponent } from './basket/basket.component';

import { DataOfOrderComponent } from './basket/data-of-order/data-of-order.component';
import { PaymantGuard } from './basket/paymant-method/guards/paymant-guard';

import { GroupComponent } from './group/group.component';
import { LoginGuard } from './login-panel/guard/auth-guard';

import { LoginPanelComponent } from './login-panel/login-panel.component';
import { AddProductComponent } from './main/add-product/add-product.component';

import { AuthGuard } from './main/add-product/guard/auth-guard';
import { MainComponent } from './main/main.component';

import { DetailComponent } from './main/products/detail/detail.component';
import { InitialViewComponent } from './start/initial-view/initial-view.component';

import { PaymantMethodComponent } from './basket/paymant-method/paymant-method.component';
import { BasketIsEmpty } from './basket/data-of-order/guard/basketIsNotEmpty.guard';

import { ContactComponent } from './contact/contact.component';
import { StatuteComponent } from './statute/statute.component';

const routes: Routes = [
  {path: "kontakt", component: ContactComponent},
  {path: "regulamin", component: StatuteComponent},

  {path: "sezon/:period", component: GroupComponent},
  {path: "sezon/:period/:group", component: MainComponent},

  {path: "sezon/:period/:group/detail/:id", component: DetailComponent },
  {path: "dodaj", component: AddProductComponent, canActivate: [AuthGuard]},

  {path: "login", component: LoginPanelComponent, canActivate: [LoginGuard]},
  {path: "nowe_konto", component: AddAccountComponent},

  {path: "koszyk", component: BasketComponent},
  {path: "zamówienie", component: DataOfOrderComponent, canActivate: [BasketIsEmpty]},

  {path: "płatność", component: PaymantMethodComponent, canActivate: [PaymantGuard]},
  {path: "", component: InitialViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}