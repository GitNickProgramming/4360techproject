import {Component, Input, OnInit} from '@angular/core';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';

@Component({
  selector: 'app-contact-detail',
  template: `
    <div class="container-fluid">
      <h2>{{contact.firstName}} {{contact.lastName}}</h2>
      <h3>Company: {{contact.company}}</h3>
      <app-phone-table [phones]="contact?.phones"></app-phone-table>
      <app-email-table [emails]="contact?.emails"></app-email-table>
    </div>
  `,
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  @Input() contact: ContactModel;

}
