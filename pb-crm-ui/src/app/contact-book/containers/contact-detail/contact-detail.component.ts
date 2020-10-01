import {Component, Input, OnInit} from '@angular/core';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';

@Component({
  selector: 'app-contact-detail',
  template: `
    <div class="container-fluid">
      <h2>{{contact.firstName}} {{contact.lastName}}</h2>
      <h4>Company: {{contact.company}}</h4>
      <div *ngFor="let phone of contact.phones; let i=index">
        <ol><strong>{{phone.type}}</strong> {{phone.number}}</ol>
      </div>
      <app-email-table [emails]="contact?.emails"></app-email-table>
    </div>
  `,
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  @Input() contact: ContactModel;

}
