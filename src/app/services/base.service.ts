import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Toolbox} from "../utils/toolbox";
import { AppStorage } from "../utils/app-storage"
import { ServerResponse } from "../models/custom.models"

export abstract class BaseService {
    private http: HttpClient;

    private _auth: Boolean;
    get auth(): Boolean {
        return this._auth;
    }
    set auth(value: Boolean) {
        this._auth = value;
    }

    private _showLog = true;
    get showLog(): boolean {
        return this._showLog;
    }
    set showLog(value: boolean) {
        this._showLog = value;
    }

    constructor(http: HttpClient) {
        if (!http)
            throw new Error("Base Service -> http is null");

        this.http = http;
        this.auth = true;
    }

    private getInternal<T>(url: string): Observable<T> {
        let options:{} = null;    
        if (this._auth) {
            let token = AppStorage.getToken();
            let headers = new HttpHeaders().set("Authorization", "Token " + btoa(token));
            options = {headers : headers};
            if (this._showLog)
              console.log("token: " + token + "  / url: " + url);
        }
        return this.http.get<T>(AppStorage.ServerAddress + url, options);
    }
    protected getSingle<T>(url: string, blockUI = true): Observable<T> {
        if (blockUI)
            $.blockUI();
        return this.getInternal<ServerResponse<T>>(url)
            .map(res => {
                if (res.Error)
                    Toolbox.showError(res.Error);
                if (blockUI)
                    $.unblockUI();
                if (res.Data && res.Data.length > 0)
                    return res.Data[0];
                else
                    return null;
            })
            .catch(this.handleError);
    }

    protected getList<T>(url: string, blockUI = true): Observable<T[]> {
        if (blockUI)
            $.blockUI();
        return this.getInternal<ServerResponse<T>>(url)
            .map(res => {
                if (res.Error)
                    Toolbox.showError(res.Error);
                if (blockUI)
                    $.unblockUI();
                return res.Data;
            })
            .catch(this.handleError);
    }

    private postInternal<T>(url: string, body: any): Observable<T> {
        let bodyJson = JSON.stringify(body);

        let headers :HttpHeaders = null; 
        if (this._auth) {
            let token = AppStorage.getToken();
            headers = new HttpHeaders().set('Content-Type', 'application/json').set("Authorization", "Token " + btoa(token));
            if (this._showLog)
                console.log("Token: " + token + "  / url: " + url);
        }else {
            headers = new HttpHeaders().set('Content-Type', 'application/json');
        }

        let options = { headers: headers };

        return <Observable<T>>this.http.post(AppStorage.ServerAddress + url, bodyJson, options);
    }
    protected postSingle<T>(url: string, body: any, blockUI = true): Observable<any> {
        if (blockUI)
            $.blockUI();
        return this.postInternal<ServerResponse<T>>(url, body)
            .map(res => {
                if (res.Error)
                    Toolbox.showError(res.Error.Message);
                if (blockUI)
                    $.unblockUI();
                if (res.Data && res.Data.length > 0)
                    return res.Data[0];
                else
                    return null;
            })
            .catch(this.handleError);
    }

    protected postList<T>(url: string, body: any, blockUI = true): Observable<any[]> {
        if (blockUI)
            $.blockUI();
        return this.postInternal<ServerResponse<T>>(url, body)
            .map(res => {
                if (res.Error)
                    Toolbox.showError(res.Error.Message);
                if (blockUI)
                    $.unblockUI();
                return res.Data;
            })
            .catch(this.handleError);
    }
    //Search İçin Eklendi.
    protected postListServerResponse(url: string, body: any, blockUi?: boolean): Observable<ServerResponse<any>> {
        let b = !(blockUi === false);
        if (b)
           $.blockUI();
        return this.postInternal<ServerResponse<any>>(url, body)
            .map(res => {
                if (res.Error)
                    Toolbox.showError(res.Error.Message);
                if (b)
                    $.unblockUI();
                return res;
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log(error);
        if (error) {
            let errorStr = error.toString(); 
            if (!BaseService.checkAccessDenied(errorStr)) {
                Toolbox.showError(error);
            } 
        }
        else
            Toolbox.showError("An error occurred requesting web api. Use console to see further detail.");
        $.unblockUI();
        return Observable.throw(error.body || 'Server error');
    }

    private static checkAccessDenied (errorMsg: string){
        const result = errorMsg.indexOf("401") !== -1 || errorMsg.indexOf("ERR_CONNECTION_TIMED_OUT") !== -1;
        if (result){
            Toolbox.showConfirm("Access Denied");
            AppStorage.logOut();
        }

        return result;
    }
}