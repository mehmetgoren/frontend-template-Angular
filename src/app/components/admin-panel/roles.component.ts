import { Component, OnInit } from '@angular/core';
import { Toolbox, GrowlMessageType, Types } from '../../utils/toolbox';
import { Role } from '../../models/entities';
import { AdminPanelService } from '../../services/admin-panel.service';
import { FormBuilder, FormGroup, } from '@angular/forms';

@Component({
    selector: 'x-role',
    templateUrl: './roles.component.html'
})

export class RolesComponent implements OnInit {

    myForm: FormGroup;

    constructor(private adminPanelService: AdminPanelService, fb: FormBuilder) {
        this.myForm = fb.group(Toolbox.getValidators(Types.Role, ['Name', 'IsAdmin']));
    }

    msgs: any[] = [];
    roles: Role[];
    selected: Role = {};
    isAdmin = false;
    dialogVisible = false;
    ngOnInit() {
        this.dataBind();
    }

    private dataBind() {
        this.adminPanelService.getRoles().subscribe(data => {
            this.roles = data;
        });
    }



    onRowSelect = (rowData) => {
        let r: Role = rowData.data;
        this.selected = r;
        this.dialogVisible = true;
    };

    addNewRecord() {
        this.selected = { Name: '', IsAdmin: false };
        this.dialogVisible = true;
    }

    save() {
        this.adminPanelService.saveRole(this.selected).subscribe(data => {
            if (data > 0) {
                this.dataBind();
                this.dialogVisible = false;
                Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.info, "Rol Kayıt Edildi");
            }
            else
                Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.error, "Rol Kayıt Edilemedi");
        });
    }

}
