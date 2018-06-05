import { Observable } from 'rxjs/Observable';

import { LazyLoadEvent } from 'primeng/primeng';
import { Field, SearchSortRequest, SelectItem } from '../models/entities';
import { UtilsService } from '../services/utils.service';
import { ServerResponse } from "../models/custom.models"
import { FormGroup, Validators, AbstractControl } from '@angular/forms';

export const Types = {
    Role: "Server.Models.Role",
    Menu: "Server.Models.Menu",
    AppUser: "Server.Models.AppUser",
    V_AppUser: "Server.Models.V_AppUser" 
}


declare var Messenger: any;

export module Toolbox {

    export function showError(msg) {
        alertify.alert(isString(msg) ? msg : JSON.stringify(msg));
    }
    export function showInfo(msg) {
        alertify.alert(isString(msg) ? msg : JSON.stringify(msg));
    }
    export function showConfirm(msg) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            alertify.prompt(msg, function (e, str) {
                if (e) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, "");
        });
    }

    export function toSelectItemList(ds: any[], valueField: string, labelField: string, addEmpty?: boolean) {
        if (ds) {
            var selectItemList: SelectItem[] = [];
            if (addEmpty) {
                selectItemList.push({ value: "", label: "Chose..." });
            }
            ds.forEach((item) => {
                selectItemList.push({ label: item[labelField], value: item[valueField] });
            });

            return selectItemList;
        }
        return null;
    }

    export function isString(o: any): boolean {
        return typeof o === 'string' || o instanceof String;
    }

    export function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    export function isInteger(n) {
        return !isNaN(parseInt(n)) && isFinite(n);
    }

    export function getParameterByName(name: string, url: string): string {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    export function copyDeep<T>(obj:T) {
        if (obj) {
            return <T>JSON.parse(JSON.stringify(obj));
        }
        return obj;
    }
    export function copyShallow<T>(obj:T){
        if (obj) {
            return <T>Object.assign({}, obj);
        }
        return obj;
    }

    export function onChangeUploadImage(inputFileId: string): JQueryPromise<string> {
        var deferred = $.Deferred<string>();
        var file = (<any>document.getElementById(inputFileId)).files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            deferred.resolve(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }

        return deferred.promise();
    }

    export function showGrowlMessage(msgs: any[], type: GrowlMessageType, msg: string) {
        msgs.length = 0;
        // msgs.splice(0, msgs.length)
        msgs.push({ severity: GrowlMessageType[type], summary: '', detail: msg });
    }

    export function setupEnterPressed(func: (p?: any) => any) {
        $(document).keypress((e) => {
            if (e.which == 13) {//13 === enter
                func();
            }
        })
    }

    export function addEmptyElement(list: SelectItem[], emptlyLabel = "Seçiniz...") {
        if (list)
            list.unshift({ value: '', label: emptlyLabel });
    }

    var metaDataDic: { [name: string]: Field[] } = {};
    export function initMetaDataList(utilsService: UtilsService): Promise<{}> {//Sadece Bir kere login de çağırılmalı.
        let typefullNameList: string[] = [];
        for (let item in Types) {
            typefullNameList.push(Types[item]);
        }

        return new Promise((resolve, reject) => {
            utilsService.getMetaData(typefullNameList).subscribe(data => {
                metaDataDic = data;// Dictionary<string, IEnumerable<Field>>      
                resolve(data)
            });
        });
    }

    export function getValidators(typefullName: string, fields?: string[]) {
        let props = metaDataDic[typefullName];
        if (!props)
            throw new Error(typefullName + " can not be found");

        let ret = {};
        let hasFileds = fields && fields.length > 0;
        props.forEach(i => {
            let found = false;
            if (hasFileds) {
                for (let columnName of fields) {
                    if (i.ColumnName === columnName) {
                        found = true;
                        break;
                    }
                }
            }
            if (!hasFileds || found) {
                let vList: ValidatorFn[] = [];

                if (i.IsNullable === false) {
                    vList.push(Validators.required);
                }
                if (i.MaxLength > 0) {
                    vList.push(Validators.maxLength(i.MaxLength));
                }
                if (i.RegularExpression){
                    vList.push(Validators.pattern(/^(?!\s|.*\s$).*$/))
                }
                ret[i.ColumnName] = ['', vList];
            }
        });
        return ret;
    }

    export function setUpServerSidePagingSearch(event: LazyLoadEvent, utilsService: UtilsService, typeFullName: string, searchModel: any, blockui?: boolean): Observable<ServerResponse<any>> {
        if (event) {
            //in a real application, make a remote request to load data using state metadata from event
            //event.first = First row offset
            //event.rows = Number of rows per page
            //event.sortField = Field name to sort with
            //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
            //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

            // console.log(JSON.stringify(event));

            let take = event.rows;//pageSize
            let page = (event.first + take) / take;
            let sort: SearchSortRequest = null;
            if (event.sortField) {
                sort = {};
                sort.field = event.sortField;
                sort.dir = event.sortOrder > 0 ? "ASC" : "DESC";
            }
            if (event.filters) {
                for (let prop in event.filters) {
                    let md = event.filters[prop];//let type is FilterMetadata =>     value?: string; matchMode?: string;
                    searchModel[prop] = md.value
                }
            }

            return utilsService.search(typeFullName, searchModel, take, page, sort, blockui);
        }
    }

    export function createDefaultLazyLoadEvent(): LazyLoadEvent {
        return { rows: 10, first: 0 };
    }

    export function getFileNameFromFileInput(id: string): string {
        var filename = null;
        if (id) {
            var fullPath = (<any>document.getElementById(id)).value;
            if (fullPath) {
                var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                filename = fullPath.substring(startIndex);
                if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                    filename = filename.substring(1);
                }
            }
        }
        return filename;
    }
}

interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}

export enum GrowlMessageType {
    info = 1,
    warn,
    error
}


export module Global {
    export const calendarTR = {
        firstDayOfWeek: 0,
        dayNames: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
        dayNamesShort: ["Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"],
        dayNamesMin: ["Pz", "Pt", "Sl", "Ça", "Pe", "Cu", "Ct"],
        monthNames: [
            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ],
        monthNamesShort: ["Ock", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağs", "Eyl", "Ekm", "Kas", "Arl"]
    };
}