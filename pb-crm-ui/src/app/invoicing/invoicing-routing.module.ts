import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountDashboardPageComponent} from "./components/account-dashboard-page/account-dashboard-page.component";
import {AccountSummaryPageComponent} from "./components/account-summary-page/account-summary-page.component";
import {InvoicePageComponent} from "./components/invoice-page/invoice-page.component";

export const InvoicingRoutes = {
  home: 'invoice',
  account: 'invoice/account/:id',
  accountWithoutID: 'invoice/account',
  invoices: 'invoice/detail/:id',
  invoicesWithoutID: 'invoice/detail'
}

const routes: Routes = [
  {path: InvoicingRoutes.home, component: AccountDashboardPageComponent},
  {path: InvoicingRoutes.account, component: AccountSummaryPageComponent},
  {path: InvoicingRoutes.invoices, component: InvoicePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicingRoutingModule { }