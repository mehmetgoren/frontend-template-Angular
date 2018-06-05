import { Component, OnInit } from '@angular/core';
import { Toolbox, GrowlMessageType, Global } from '../../utils/toolbox';
import { SelectItem } from '../../models/entities';
import { UtilsService } from '../../services/utils.service';
import { BaseService } from '../../services/base.service';
import { LazyLoadEvent } from 'primeng/primeng';


@Component({
    selector: 'x-querylog',
    templateUrl: './query-log.component.html'
})

export class QueryLogComponent implements OnInit {

    msgs: any[] = [];
    constructor(private utilsService: UtilsService) {
    }

    query = "";
    preDefinedQueryList: SelectItem[];

    ngOnInit() {

        this.preDefinedQueryList = [];
        this.preDefinedQueryList.push({ value: null, label: "Please select a predefined query" });
        this.preDefinedQueryList.push({ value: "select * from Log t where t.Code=313 order by t.Id desc", label: "Login" });
        this.preDefinedQueryList.push({ value: "select t.Method, count(*) from Log t where t.Code=1010 group by t.Method", label: "WebSocket Connection Numbers" });


        Toolbox.setupEnterPressed(this.onExecuteQuery);
    }

    onPreDefinedChanged(event) {
        this.query = (event.value ? event.value : "");
    }

    fields: any[] = [];
    queryList: any[];
    onExecuteQuery() {
        if (this.query) {
            this.fields.length = 0;
            this.utilsService.queryLog(this.query)
                .subscribe(data => {
                    if (data && data.length) {
                        for (var field in data[0]) {
                            this.fields.push(field);
                        }
                    }
                    this.queryList = data;
                });
        } else {
            Toolbox.showGrowlMessage(this.msgs, GrowlMessageType.info, "Please write a query");
        }
    }


}