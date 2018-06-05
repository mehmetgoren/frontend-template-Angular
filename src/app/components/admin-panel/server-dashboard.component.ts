import { Component} from '@angular/core';
import { Toolbox, GrowlMessageType } from '../../utils/toolbox';
import { UtilsService } from '../../services/utils.service'
import { ServerInfo, ChartModel } from '../../models/entities';

import { AppStorage } from '../../utils/app-storage';
import { SignalrComponent } from "../signalr.component"

import { HubConnection } from '@aspnet/signalr-client';

@Component({
    selector: 'x-serverdashboard',
    templateUrl: './server-dashboard.component.html'
})

export class ServerDashboardComponent extends SignalrComponent {

    private conn: HubConnection;

    //override
    initSignalR()  {
        this.conn = new HubConnection(AppStorage.Host + "/servermonitoring");

        this.conn.on("notify", (data) => {
            this.info = data.info;// this.fixSignalRJson(data.info);

            if (!this.cmCpu) this.cmCpu = data.cmCpu;
            if (!this.cmRam) this.cmRam = data.cmRam;
            if (!this.cmHdd) this.cmHdd = data.cmHdd;

            this.log(JSON.stringify(data));
        });

        this.conn.start().then(() => {
            this.conn.invoke("Start");
        }).catch(err => {
            alert(JSON.stringify(err));
        });
    }
    //override
    disposingSignalR(){
        if (this.conn){
            this.conn.invoke("Stop").then(() => { 
                this.conn.stop()
            });
        }
    }

    msgs: any[] = [];

    constructor(private utilsService: UtilsService) {
        super();
    }

    info: ServerInfo = {}
    cmCpu: ChartModel;
    cmRam: ChartModel;
    cmHdd: ChartModel;



    refresh(ramChart, diskChart) {
        ramChart.refresh();
        diskChart.refresh();
    }


    //Connected Users
    connectedUserVisible = false;
    connectedUserList: any[];
    showActiveUser() {
        this.utilsService.getConnectedUsers()
            .subscribe(data => {
                this.connectedUserVisible = true;
                this.connectedUserList = data;
            });
    }
    onConnectedWindowClosed() {
        this.connectedUserList = null;
    }
    //
}