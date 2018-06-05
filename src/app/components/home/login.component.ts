import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { Toolbox, GrowlMessageType, Global } from '../../utils/toolbox';

import { UtilsService } from '../../services/utils.service';
import { AppStorage } from '../../utils/app-storage';
import { UnauthorizedService } from '../../services/unauthorized.service'
import { UserLocal } from '../../models/entities';

@Component({
    selector: 'x-login',
    templateUrl: './login.component.html',
    //styles: [Global.blinkCss]
})

export class LoginComponent implements OnInit, AfterViewInit {

    @Output() onSuccessfulLogin = new EventEmitter<UserLocal>();

    constructor(private utilsService: UtilsService, private unauthorizedService: UnauthorizedService) {

    }


    ngAfterViewInit() {

    }

    ngOnInit() {

        setTimeout(() => {
            this.userName = "admin";
            this.password = "admin";
            this.onLogin();
        }, 500);

    }


    private userName = null;
    private password = null;
    msgs: any[] = [];

    onLogin() {
        if (this.userName && this.password) {
            this.unauthorizedService.login({ Username: this.userName, Password: this.password }).subscribe(userLocal => {
                if (userLocal && userLocal.Token) {
                    AppStorage.setUser(userLocal);

                    Toolbox.initMetaDataList(this.utilsService).then(metaData =>{
                        this.onSuccessfulLogin.emit(userLocal);
                    });
                }
                else
                    Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.warn, "Username and/or password invalid.");
            });
        }
        else {
            this.msgs.push({ severity: 'warn', summary: 'Unsuccessful login attempt', detail: 'User name/ pasword can not be empty.' });
        }
    }
}

