import { Route } from "@angular/router";
import { ComponentDetailsComponent } from "./components/component-details/component-details.component";

export const DASHBOARD_ROUTES: Route[] = [
    {
        path: '', 
        loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
        children: [{ path: ':type', component: ComponentDetailsComponent }]
    }
]