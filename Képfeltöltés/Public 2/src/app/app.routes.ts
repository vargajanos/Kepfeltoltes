
import { Routes } from '@angular/router';
import { StatisticComponent } from './components/statistic/statistic.component';
import { HomeComponent } from './components/home/home.component';
import { TimelineComponent } from './components/timeline/timeline.component';

export const routes: Routes = [

    {
        path: 'home', component:HomeComponent
    },
    {
        path: 'stat', component:StatisticComponent
    },
    {
        path: 'time', component:TimelineComponent
    },
    {
        path:'', redirectTo: 'home', pathMatch:'full'
    }
];


