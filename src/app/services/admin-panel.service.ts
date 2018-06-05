import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';
import { Menu, Role, V_Menu, V_RoleMenu, TreeNode, SaveRoleActionsModel, AppUser, SelectItem, AppSetting } from '../models/entities';


@Injectable()
export class AdminPanelService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
    }

    getRoles(): Observable<Role[]> {
        return this.getList("/api/AdminPanel/GetRoles");
    }

    getRolesNoAdmin(): Observable<Role[]> {
        return this.getList("/api/AdminPanel/GetRolesNoAdmin");
    }

    saveRole = (role: Role): Observable<number> => {
        return this.postSingle("/api/AdminPanel/SaveRole", role);
    };

    getMenus = (): Observable<V_Menu[]> => {
        return this.getList("/api/AdminPanel/GetMenus");
    };

    saveMenu = (menu: Menu): Observable<number> => {
        return this.postSingle("/api/AdminPanel/SaveMenu", menu);
    };

    createMenu = (roleId: number): Observable<Menu[]> => {
        return this.getList("/api/AdminPanel/CreateMenu?roleId=" + roleId);
    }

    getRoleMenuList(roleId: number): Observable<V_RoleMenu[]> {
        return this.getList("/api/AdminPanel/GetRoleMenuList?roleId=" + roleId);
    }

    saveRoleMenu(roleId: number, vRoleMenus: V_RoleMenu[]) {
        let ap = { roleId: roleId, vRoleMenus: vRoleMenus };
        return this.postSingle("/api/AdminPanel/SaveRoleMenu", ap);
    }



    //Web Api
    getApiActionsHierarchical(role: string): Observable<TreeNode[]> {
        return this.getList("/api/AdminPanel/GetApiActionsHierarchical?role=" + role);
    }

    saveActionRoles(model: SaveRoleActionsModel): Observable<number> {
        return this.postSingle("/api/AdminPanel/SaveActionRoles", model);
    }

    clearUnusedRoleActions(): Observable<number> {
        return this.postSingle("/api/AdminPanel/ClearUnusedRoleActions", null);
    }
    //

    //AppUser

    saveAppUser(model: AppUser): Observable<number> {
        return this.postSingle("/api/AdminPanel/SaveAppUser", model);
    }
    //

    getAppSettingList(): Observable<AppSetting[]> {
        return this.getList("/api/AdminPanel/GetAppSettingList");
    }

    updateAllAppSetting(appSettingList: AppSetting[]) {
        return this.postSingle("/api/AdminPanel/UpdateAllAppSetting", appSettingList);
    }
}

