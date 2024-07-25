import { Component, OnInit } from '@angular/core';
import { TemplateUserComponent } from '../../shared/template-user/template-user.component';
import { HistoryService } from '../../services/history.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [TemplateUserComponent, CommonModule, DatePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit{

  constructor(private historyService: HistoryService) { }

  historyData: any;

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory() {
    let userId = localStorage.getItem('userId') as string;
    this.historyService.getHistoryById(userId).subscribe({
      next: (data) => {
        console.log(data);
        this.historyData = data.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getStatusDisplay(status: string) {
    return status.replace('STATUS_', '');
  }

}
