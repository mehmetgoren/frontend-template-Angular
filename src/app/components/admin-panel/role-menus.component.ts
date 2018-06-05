import { Component, OnInit } from '@angular/core';
import { Toolbox, GrowlMessageType } from '../../utils/toolbox';
import { Role, V_RoleMenu } from '../../models/entities';
import { AdminPanelService } from '../../services/admin-panel.service';

@Component({
    selector: 'x-rolemenus',
    templateUrl: './role-menus.component.html'
})

export class RoleMenusComponent implements OnInit {

    msgs: any[] = [];

    fpi: string[];
    selectedFingerIndex: string = "val7";
    constructor(private adminPanelService: AdminPanelService) {
        this.fpi = [];
    }

    roles: Role[];
    ngOnInit() {
        this.adminPanelService.getRolesNoAdmin().subscribe(data => {
            data.forEach(i => {
                this.fpi.push("val" + i.Id.toString());
            });
            this.roles = data;
        });
    }

    vRoleMenus: V_RoleMenu[];

    selectedRole: V_RoleMenu;
    onRadioButtonClick(index: number) {
        //this.selectAll = false;
        this.selectedRole = this.roles[index];
        this.adminPanelService.getRoleMenuList(this.selectedRole.Id).subscribe(data => {
            this.vRoleMenus = data;
        });
    }

    selectAll = false;
    onSelectAll() {
        if (this.vRoleMenus) {
            this.vRoleMenus.forEach(i => {
                i.HasAccess = this.selectAll;
            });
        }
    }

    onSave() {
        if (this.selectedRole && this.vRoleMenus && this.vRoleMenus.length > 0) {
            this.adminPanelService.saveRoleMenu(this.selectedRole.Id, this.vRoleMenus).subscribe(data => {
                if (data > 0) {
                    Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.info, "Saved");
                }
                else {
                    Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.error, "Save operation can not be completed");
                }
            });
        }
        else
            Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.warn, "Pleased select a record");
    }
}