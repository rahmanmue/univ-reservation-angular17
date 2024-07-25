import { Component } from '@angular/core';
import { NavbarUserComponent } from '../../components/navbar-user/navbar-user.component';
import { FooterUserComponent } from '../../components/footer-user/footer-user.component';

@Component({
  selector: 'app-template-user',
  standalone: true,
  imports: [NavbarUserComponent, FooterUserComponent],
  templateUrl: './template-user.component.html',
  styleUrl: './template-user.component.scss'
})
export class TemplateUserComponent {

}
