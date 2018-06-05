import { OnInit } from '@angular/core';
import { AppStorage } from '../utils/app-storage';
import { UserLocal } from '../models/entities';

export abstract  class BaseComponnet implements OnInit {

    protected checkAuthOnInit = true;

    private getUser(): UserLocal {
        return AppStorage.getUserIfNotAuthenticatedThenLogOut();
    }
    protected checkAuth() {
        AppStorage.getUserIfNotAuthenticatedThenLogOut();
    }

    ngOnInit() {
        if (this.checkAuthOnInit) {
            this.checkAuth();
        }
    }
}