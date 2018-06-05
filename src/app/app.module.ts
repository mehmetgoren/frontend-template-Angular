import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { routing } from './app.routing';

import { PrimeNgModules, PrimeNgServices } from './primeng-imports'

import { AdminPanelModule } from '../app/components/admin-panel/admin-panel.module'

import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent } from './components/_controls/app-menu.component';
import {AppBreadcrumbComponent} from "./components/_controls/app.breadcrumb.component"
import {AppRightpanelComponent} from "./components/_controls/app.rightpanel.component"
import { AppTopbarComponent } from './components/_controls/app-topbar.component';
import { AppFooterComponent } from './components/_controls/app-footer.component';
import { AppInlineProfileComponent } from './components/_controls/app.profile.component';
import { CancelableBlockUiComponent } from './components/_jQueryComponents/cancelable-blockui.component';
import { DefaultComponent } from './components/home/default.component';
import { LoginComponent } from './components/home/login.component';
import { EmptyComponent } from './components/home/empty.component';



import {BreadcrumbService} from "./services/breadcrumb.service"
import { UnauthorizedService } from './services/unauthorized.service';
import { CatalogService } from './services/catalog.service';
import { LogService } from './services/log.service';
import { UtilsService } from './services/utils.service'


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, routing,PrimeNgModules,
    AdminPanelModule],

    declarations: [AppComponent, AppBreadcrumbComponent,AppRightpanelComponent,AppMenuComponent, AppSubMenuComponent, AppTopbarComponent, AppFooterComponent
        , AppInlineProfileComponent, CancelableBlockUiComponent, DefaultComponent, LoginComponent, EmptyComponent
    ],

    providers: [PrimeNgServices, BreadcrumbService, UnauthorizedService, CatalogService, LogService, UtilsService],

    bootstrap: [AppComponent]
})
export class AppModule { }