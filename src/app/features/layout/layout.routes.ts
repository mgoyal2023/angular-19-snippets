import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const LAYOUT_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () => import('./layout.component').then(m => m.LayoutComponent), children: [{
            path: '', loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
        },
        ]
    }
]