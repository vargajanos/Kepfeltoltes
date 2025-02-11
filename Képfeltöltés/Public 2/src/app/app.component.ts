import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { HomeComponent } from "./components/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MenubarModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  title = 'Public';


  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
          label: 'Galéria',
          icon: 'pi pi-home',
          routerLink: "/home"
      },
      {
          label: 'Statisztika',
          icon: 'pi pi-chart-bar',
          routerLink: "/stat"
      },
      {
        label: 'Idővonal',
        icon: 'pi pi-stopwatch',
        routerLink: "/time"
    }
  ]
  }
}
