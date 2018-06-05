import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'x-cancelableblockui',
    template: `<div id="divCancelableBlockUi" style="display: none; cursor: default">
        <div class="ui-fluid">
            <div class="ui-g">
                <div class="ui-g form-group">
                    <div class="ui-g-12 ui-md-12">
                        <button type="button" pButton (click)="unblock()" label="Arka Planda Çalıştır"></button>
                    </div>
                    <div class="ui-g-12 ui-md-12">
                        <div class="loader"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class CancelableBlockUiComponent implements OnInit {

    cancelDivForBlockUi;
    ngOnInit() {
        this.cancelDivForBlockUi = $('#divCancelableBlockUi');
    }


    @Output() onblock = new EventEmitter<any>();
    blockUI($event) {
        this.cancelledByUser = false;
        let customBlockUIFunc = () => {
            if (!this.cancelledByUser)
                $.blockUI({ message: this.cancelDivForBlockUi, css: { width: '275px' } });
        };

        customBlockUIFunc();
        this.onblock.emit($event);
    }

    @Output() onUnblock = new EventEmitter<any>();

    cancelledByUser = false;
    private unblock() {
        this.cancelledByUser = true;
        $.unblockUI();
        this.onUnblock.emit();
    }
}