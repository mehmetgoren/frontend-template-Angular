import { Component, OnInit } from '@angular/core';
import { Toolbox, GrowlMessageType } from '../../utils/toolbox';
import { AppStorage } from "../../utils/app-storage"
import { AppSetting } from '../../models/entities';
import { AdminPanelService } from '../../services/admin-panel.service';
import { UtilsService } from '../../services/utils.service';

@Component({
    selector: 'x-appsettings',
    templateUrl: './appsettings..component.html'
})

export class AppSettingsComponent implements OnInit {

    msgs: any[] = [];

    constructor(private adminPanelService: AdminPanelService, private utilsService: UtilsService) {
    }


    ngOnInit() {
        this.dataBind();
    }

    appSettingList: AppSetting[];
    private dataBind() {
        this.adminPanelService.getAppSettingList().subscribe(data => {
            this.appSettingList = data;
        });
    }

    save() {
        if (this.appSettingList && this.appSettingList.length) {
            this.adminPanelService.updateAllAppSetting(this.appSettingList).subscribe(data => {
                if (data > 0) {
                    this.dataBind();
                    Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.info, "Saved");
                }
                else
                    Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.error, "Save operation could not be completed");
            });
        } else {
            Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.warn, "No such a settings attribute.");
        }
    }

    reset() {
        this.utilsService.resetServerApp().subscribe(data => {
            AppStorage.logOut();
        });
    }

}
