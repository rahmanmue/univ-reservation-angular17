import { Component } from '@angular/core';
import { TemplateAdminComponent } from '../../shared/template-admin/template-admin.component';
import { RouterOutlet } from '@angular/router';
import { AnalyticsService } from '../../services/analytics.service';
import { Chart } from 'chart.js/auto';

interface FACILITIES {
  FACILITIES_TOOL : string,
  FACILITIES_VEHICLE : string,
  FACILITIES_PLACE : string
}

interface TRANSACTION {
  STATUS_COMPLETED : string,
  STATUS_APPROVED : string,
  STATUS_PROCESSED : string,
  STATUS_REJECTED : string,
  STATUS_CANCELED : string,
  STATUS_PENALTY : string
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [TemplateAdminComponent, RouterOutlet],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {
  facilities! : FACILITIES; 
  transaction! : TRANSACTION;
  chart:any;
  

  constructor(
    private analyticsService: AnalyticsService,
  ){}

  ngOnInit(): void {
    this.analyticsService.getAnalyticsFacilities().subscribe(data => {
      this.facilities = data as FACILITIES;
      this.createChartFacilities();
    })

    this.analyticsService.getAnalyticsTransaction().subscribe(data => {
      this.transaction = data as TRANSACTION;
      this.createChartTransaction();
    })
  }

  createChartFacilities(){
    const ctx = document.getElementById('facilitiesStatusChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["KENDARAAN", "ALAT", "TEMPAT"],
        datasets: [{
          label: "Independent Status",
          data: [this.facilities.FACILITIES_VEHICLE, this.facilities.FACILITIES_TOOL, this.facilities.FACILITIES_PLACE],
          backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 206, 86)'] 
        }]
      }
    });
  }
  
  
  createChartTransaction(){
    const ctx = document.getElementById('transactionStatusChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["DITERIMA", "DITOLAK", "DIPROSES", "DITOLAK", "DIBATALKAN", "DIKEMBALIKAN"],
        datasets: [{
          label: "Status Peminjaman",
          data: [this.transaction.STATUS_APPROVED, this.transaction.STATUS_REJECTED, this.transaction.STATUS_PROCESSED, this.transaction.STATUS_CANCELED, this.transaction.STATUS_PENALTY, this.transaction.STATUS_COMPLETED],
          backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 206, 86)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)', 'rgb(255, 159, 64)'] 
        }],
      }});
  }


  
 



}
