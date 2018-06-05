import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmptyComponent } from './components/home/empty.component';

import {} from '../app/components/admin-panel/admin-panel.module'

const appRoutes: Routes = [
    { path: '', component: EmptyComponent },
    { path: 'adminpanel', loadChildren: '../app/components/admin-panel/admin-panel.module#AdminPanelModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);