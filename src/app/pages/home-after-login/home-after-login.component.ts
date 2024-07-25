import { Component } from '@angular/core';
import { TemplateUserComponent } from '../../shared/template-user/template-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardItemComponent } from '../../components/card-item/card-item.component';

@Component({
  selector: 'app-home-after-login',
  standalone: true,
  imports: [
    TemplateUserComponent,
    CardItemComponent,
    NgbModule
  ],
  templateUrl: './home-after-login.component.html',
  styleUrl: './home-after-login.component.scss'
})
export class HomeAfterLoginComponent {

}
