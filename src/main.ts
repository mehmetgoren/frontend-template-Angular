/// <reference path="./app/browser.d.ts" />

import 'rxjs/Rx';
import { enableProdMode } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';


if (environment.production)
    enableProdMode();
    
platformBrowserDynamic().bootstrapModule(AppModule);

//neredeyiz angular.cli.json a signalr client ı ekleyi,p test edeceğiz.