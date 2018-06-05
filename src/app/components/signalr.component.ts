
import { OnInit, OnDestroy } from '@angular/core';
import { BaseService } from '../services/base.service';

export abstract class SignalrComponent implements OnInit, OnDestroy {

    ngOnInit() {
        this.initSignalR();
    }


    ngOnDestroy() {
        this.disposingSignalR();
    }

    protected log(value) {
        console.log("<= **** " + value + " **** =>");
    }

    abstract initSignalR();
    abstract disposingSignalR();

    //bu alpha' dan sonra silinecek
    // protected fixSignalRJson(obj): any{
    //     let ret = {};
    //     if (obj){
    //         for(let prop in obj){
    //             let propStr : string = prop;
    //             propStr = propStr[0].toUpperCase() + propStr.substring(1, propStr.length);
    //             ret[propStr] = obj[prop];
    //         }
    //     }

    //     return ret;
    // }
}