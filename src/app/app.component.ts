import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterUserComponent } from './components/footer-user/footer-user.component';
import { TemplateUserComponent } from './shared/template-user/template-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
  }
  title = 'campus-reservation';
}
