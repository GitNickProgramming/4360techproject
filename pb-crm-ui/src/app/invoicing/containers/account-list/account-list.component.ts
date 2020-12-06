import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import { AccountModel, InvoiceModel, PaymentModel } from '@hiddentemple/api-interfaces';
import {ApiService} from '../../../api/api.service';
import {InvoicingRoutes} from '../../invoicing-routing.module';
import {Router} from '@angular/router';
import {MatListModule} from '@angular/material/list'

@Component({
  selector: 'app-account-list',
  template: `
    <mat-list>
      <mat-list-item *ngFor = "let account of accounts" (click)="goToAccount(account.id)">
        {{account.name}}
      </mat-list-item>
    </mat-list>
  `,
  styles: [
  ]
})
export class AccountListComponent {
  @Input() accounts: AccountModel[];

  constructor(private router: Router) {}

  goToAccount(id: string){
    this.router.navigate([InvoicingRoutes.accountWithoutID, id]);
  }
}
