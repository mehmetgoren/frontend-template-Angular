import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Toolbox, GrowlMessageType, Types } from '../../utils/toolbox';
import { V_AppUser, AppUser, SelectItem } from '../../models/entities';
import { AdminPanelService } from '../../services/admin-panel.service';
import { UtilsService, SearchSortRequest } from '../../services/utils.service';
import { LazyLoadEvent } from 'primeng/primeng';

@Component({
    selector: 'x-appusers',
    templateUrl: './app-users.component.html'
})

//Web Ai de admin olmayan burayı göremesin ve değiştiremesin.
export class AppUsersComponent implements OnInit {

    msgs = [];

    myForm: FormGroup;

    constructor(private utilsService: UtilsService, private adminPanelService: AdminPanelService, fb: FormBuilder) {

        this.myForm = fb.group(Toolbox.getValidators(Types.AppUser, ['RoleId', 'Username', 'Password']));
    }

    roles: SelectItem[];

    ngOnInit() {
        this.adminPanelService.getRoles().subscribe(data => {
            this.roles = Toolbox.toSelectItemList(data, "Id", "Name");
            Toolbox.addEmptyElement(this.roles, "Please Select a Role...");
        });

        Toolbox.setupEnterPressed(this.onSearch);
    }

    search: V_AppUser = {};
    v_AppUserList: any[] = [];
    total: number;
    onSearch = ($event?) => {
        this.loadLazy({ rows: 10, first: 0 });
    };

    loadLazy(event: LazyLoadEvent) {
        Toolbox.setUpServerSidePagingSearch(event, this.utilsService, Types.V_AppUser, this.search).subscribe(
            response => {
                this.v_AppUserList = response.Data;
                this.total = response.Total;
            });
    }


    dialogVisible = false;
    selected: V_AppUser;

    private setUpEditMode(e: V_AppUser) {
        this.selected = e;
        this.dialogVisible = true;
    }

    onRowSelect(rowData) {
        this.setUpEditMode(rowData.data);
    }

    addNewRecord() {
        this.setUpEditMode({});
    }

    saveNewRecord() {
        if (this.selected) {
            this.adminPanelService.saveAppUser(this.selected).subscribe(data => {
                Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.info, "Saved.");
                this.loadLazy({ rows: 10, first: 0 });
                this.dialogVisible = false;
            });;
        }
        else
            Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.warn, "Please select a user.");
    }
}
