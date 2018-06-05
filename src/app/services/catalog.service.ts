import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BaseService} from './base.service';
import {} from '../models/entities';
import {SelectItem} from  'primeng/primeng';


@Injectable()
export class CatalogService extends BaseService {

    constructor(http: HttpClient) {
        super(http);
    }

   
}

