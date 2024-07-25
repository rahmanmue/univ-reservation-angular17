import { Component } from '@angular/core';
import { TemplateUserComponent } from '../../shared/template-user/template-user.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { CardItemComponent } from '../../components/card-item/card-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TemplateUserComponent, 
    CarouselComponent,
    CardItemComponent,
    NgbModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
