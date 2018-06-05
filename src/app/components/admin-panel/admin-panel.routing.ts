
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleActionsComponent } from './role-actions.component';
import { RolesComponent } from './roles.component';
import { MenusComponent } from './menus.component';
import { RoleMenusComponent } from './role-menus.component';
import { AppUsersComponent } from './app-users.component';
import { AppSettingsComponent } from './appsettings.component'
import { QueryLogComponent } from './query-log.component'
import { ServerDashboardComponent } from './server-dashboard.component';
import { ImageDemoComponent } from './image-demo.component';

const childrenRoutes: Routes = [
    { path: 'RoleActions', component: RoleActionsComponent },
    { path: 'Roles', component: RolesComponent },
    { path: 'Menus', component: MenusComponent },
    { path: 'RoleMenus', component: RoleMenusComponent },
    { path: 'AppUsers', component: AppUsersComponent },
    { path: 'AppSettings', component: AppSettingsComponent },
    { path: 'QueryLog', component: QueryLogComponent },
    { path: 'ServerDashboard', component: ServerDashboardComponent },
    { path: 'ImageDemo', component: ImageDemoComponent }
];

export const adminPanelRouting: ModuleWithProviders = RouterModule.forChild(childrenRoutes);