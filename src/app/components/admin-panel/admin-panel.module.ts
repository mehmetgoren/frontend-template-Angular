import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { adminPanelRouting } from './admin-panel.routing';

import { PrimeNgModules, PrimeNgServices } from '../../primeng-imports'

import { RoleActionsComponent } from './role-actions.component';
import { RolesComponent } from './roles.component';
import { MenusComponent } from './menus.component';
import { RoleMenusComponent } from './role-menus.component';
import { AppUsersComponent } from './app-users.component';
import { AppSettingsComponent } from './appsettings.component'
import { QueryLogComponent } from './query-log.component'
import { ServerDashboardComponent } from './server-dashboard.component';
import { ImageDemoComponent } from './image-demo.component';

import { AdminPanelService } from '../../services/admin-panel.service'
import { UtilsService } from '../../services/utils.service';



@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, adminPanelRouting,PrimeNgModules],

    declarations: [RolesComponent, RoleActionsComponent, MenusComponent, RoleMenusComponent, AppUsersComponent
        , AppSettingsComponent, QueryLogComponent, ServerDashboardComponent, ImageDemoComponent],

    providers: [PrimeNgServices, AdminPanelService, UtilsService]
})
export class AdminPanelModule { }