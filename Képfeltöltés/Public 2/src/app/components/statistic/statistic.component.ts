import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [ChartModule, ToastModule],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss',
  providers: [MessageService]
})
export class StatisticComponent implements OnInit{

  constructor (private api:ApiService,    
  private messageService: MessageService){

  }
  basicData: any;

  basicOptions: any;

  statistic:any = {};



  getStat(){
    this.api.stats().subscribe((res:any)=>{
      res.forEach((item:any) => {
        this.basicData.labels.push(item.name)
        this.basicData.datasets[0].data.push(item.darab)
      });

      this.basicOptions = {...this.basicOptions}
    })
  }

  ngOnInit() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.getStat();
    this.basicData = {
        datasets: [
            {
                label: 'Képek száma',
                backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                borderWidth: 1
            }
        ]
    };

    this.basicOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

}
