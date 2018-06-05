import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UtilsService } from './services/utils.service';
import { AppStorage } from './utils/app-storage';
import { Toolbox } from './utils/toolbox';

@Component({
    selector: 'x-app',
    templateUrl: './app.html',
})

export class AppComponent implements OnInit, AfterViewInit {

    constructor(private utilsService: UtilsService) {

    }

    private isAuthenticated = false;
    ngOnInit() {

        let user = AppStorage.getUser();
        if (user) {
            Toolbox.initMetaDataList(this.utilsService).then((metaData) => {
                this.isAuthenticated = true;
            });
        }
    }

    ngAfterViewInit() {

    }

    onSuccessfulLogin(userLocal) {
        let user = AppStorage.getUser();
        if (user) {
            this.isAuthenticated = true;
        }
    }
}

