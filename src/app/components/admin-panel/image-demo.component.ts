import { Component } from '@angular/core';
import { Toolbox, GrowlMessageType } from '../../utils/toolbox';
import { ServerInfo, ChartModel } from '../../models/entities';

import { AppStorage } from '../../utils/app-storage'
import { SignalrComponent } from "../signalr.component"
import { HubConnection, IHttpClient } from '@aspnet/signalr-client';

@Component({
    selector: 'x-imagedemo',
    templateUrl: './image-demo.component.html'
})

export class ImageDemoComponent extends SignalrComponent {
    private conn: HubConnection;
   
    //override
    initSignalR() {
        this.conn = new HubConnection(AppStorage.Host + "/images",);
        
        this.conn.on("notify", (data) => {
            this.image = 'data:image/png;base64,' + data;
        });

        this.conn.start().then(() => {
            this.conn.invoke("FloodImages");
        }).catch(err => {
            alert(JSON.stringify(err));
        });
    }

    msgs: any[] = [];

    //override
    async disposingSignalR() {
        if (null != this.conn)
           await this.conn.stop();
    }   

    image: any;
}
