import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable}  from 'rxjs/Observable';
import {BaseService} from './base.service';
import {Field}  from '../models/entities';
import {ServerResponse}  from '../models/custom.models';

@Injectable()
export class UtilsService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
    }


    search(typeFullName: string, searchObj: any, take?: number, page?: number, sort?: SearchSortRequest, blockui?:boolean): Observable<ServerResponse<any>> {
        var req: SearchRequest = { TypeFullName: typeFullName, EntityJson: JSON.stringify(searchObj) };
        let arr: SearchSortRequest[] = null;
        if (sort) {
            arr = [sort];
        }
        var body: SearchParams = { Request: req, Take: take, Page: page, Sort: arr }
        return this.postListServerResponse("/api/Utils/Search", body, blockui);
    }

    getMetaData(typeFullNameList: string[]): Observable<any> {
        return this.postList("/api/utils/GetMetaData", typeFullNameList);
    }


    queryLog(query: string): Observable<any[]> {
        return this.getList("/api/utils/QueryLog?query=" + btoa(query));
    }

    resetServerApp(): Observable<any> {
        return this.getSingle("/api/utils/ResetServerApp");
    }

    getConnectedUsers(): Observable<any[]> {
        return this.getList("/api/utils/GetConnectedUsers");
    }
}
 export interface SearchRequest {
    TypeFullName?: string;
    EntityJson?: string;
}

export interface SearchSortRequest {
    field?: string;
    dir?: string;
}

export interface SearchParams {
    Request?: SearchRequest;
    Take?: number;
    Page?: number;
    Sort?: SearchSortRequest[];
}