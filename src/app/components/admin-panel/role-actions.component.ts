import { Component, OnInit } from '@angular/core';
import { Toolbox, GrowlMessageType } from '../../utils/toolbox';
import { Role, TreeNode, SaveRoleActionsModel } from '../../models/entities';
import { AdminPanelService } from '../../services/admin-panel.service';

@Component({
    selector: 'x-roleactions',
    templateUrl: './role-actions.component.html'
})

export class RoleActionsComponent implements OnInit {
    constructor(private adminPanelService: AdminPanelService) {
    }

    msgs: any[] = [];
    roles: Role[];

    selectedValue: string;

    ngOnInit() {
        this.dataBind();
    }

    private dataBind() {
        this.adminPanelService.getRolesNoAdmin().subscribe(data => {
            this.roles = data;
        });
    }

    roleActions: TreeNode[];

    selectedRole: Role;
    onRoleChanged(r: Role) {
        if (r && r.Id && r.Id > 0) {
            this.selectedRole = r;
            this.adminPanelService.getApiActionsHierarchical(r.Name).subscribe(data => {
                this.roleActions = data;
            });
        }
    }

    onNodeChacked(node: TreeNode) {
        if (node.children && node.children.length > 0) {
            for (let c of node.children) {
                c.checked = node.checked;
            }
        }
    }

    //primeng de tree yapısı expand olunca parent ekliyor.
    private setParentNull() {
        let index = 0;
        for (let item of this.roleActions) {
            if (item.children) {
                let childIndex = 0;
                for (let child of item.children) {
                    child.parent = null;
                }
            }
            ++index;
        }
    }

    onSave() {
        this.setParentNull();
        let temp: SaveRoleActionsModel = {};
        temp.Data = this.roleActions;// this.postModelRoleActions;
        temp.RoleName = this.selectedRole.Name;
        temp.Type = 1;//1 === web api
        this.adminPanelService.saveActionRoles(temp).subscribe(data => {
            Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.info, "Saved");
        });
    }

    onDeleteUnused() {
        this.adminPanelService.clearUnusedRoleActions().subscribe(data => {
            Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.info, "Deleted unused record count: " + data);
        });
    }
}
