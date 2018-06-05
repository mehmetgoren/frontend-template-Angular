import { Component, OnInit } from '@angular/core';
import { Toolbox, GrowlMessageType, Types } from '../../utils/toolbox';
import { Menu, V_Menu, SelectItem } from '../../models/entities';
import { AdminPanelService } from '../../services/admin-panel.service';
import { UtilsService } from '../../services/utils.service'; 'primeng/primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { List } from '../../utils/linq';

@Component({
    selector: 'x-menus',
    templateUrl: './menus.component.html'
})

export class MenusComponent implements OnInit {

    myForm: FormGroup;
    constructor(private adminPanelService: AdminPanelService, private utilsService: UtilsService, fb: FormBuilder) {
        this.myForm = fb.group(Toolbox.getValidators(Types.Menu, ['ParentId', 'Name', 'Controller', 'Action', 'Route', 'OrderNum', 'Visible', 'Image']));
    }

    msgs: any[] = [];
    menus: V_Menu[];
    selected: V_Menu = {};
    dialogVisible = false;
    ngOnInit() {
        this.dataBind();
    }

    menuSelecItems: any[];
    private dataBind() {
        this.adminPanelService.getMenus().subscribe(data => {
            this.menus = data;
            if (data && data.length > 0) {
                let list = List.create(data);
                this.menuSelecItems = Toolbox.toSelectItemList(list.where(p => p.ParentId == null).orderBy(p => p.OrderNum).toArray(), "Id", "Name", true);
            }
        });
    }

    onRowSelect = (rowData) => {
        let m: Menu = rowData.data;
        this.selected = m;
        this.dialogVisible = true;
    };

    addNewRecord() {
        this.selected = {};
        this.dialogVisible = true;
    }

    save() {
        if (!this.selected.Image) {
            this.selected.Image = this.selected.ParentId ? "fiber_manual_record" : "settings_application";
        }

        this.adminPanelService.saveMenu(this.selected).subscribe(data => {
            if (data > 0) {
                this.dataBind();
                this.dialogVisible = false;
                Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.info, "Menü Kayıt Edildi");
            }
            else
                Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.error, "Menü Kayıt Edilemedi");
        });
    }

}
