import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((c) => c.HomePage)
    },
    {
        path: 'detalhes/:id',
        loadComponent: () => import('./detalhes/detalhes.page').then((c) => c.DetalhesPage)
    }
];
