// Type definitions for Vex v2.3.2
// Project: https://github.com/HubSpot/vex
// Definitions by: Greg Cohan <https://github.com/gdcohan>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped



declare namespace vex {

    interface VexMessageOptions {
        message?: string;
        callback?: ((value: any) => void);
    }

    interface ICSSAttributes {
        [property: string]: string | number;
    }

    interface IVexOptions {
        afterClose?: (() => void);
        afterOpen?: ((vexContent: JQuery) => void);
        content?: string;
        showCloseButton?: boolean;
        escapeButtonCloses?: boolean;
        overlayClosesOnClick?: boolean;
        appendLocation?: HTMLElement | JQuery | string;
        className?: string;
        css?: ICSSAttributes;
        overlayClassName?: string;
        overlayCSS?: ICSSAttributes;
        contentClassName?: string;
        contentCSS?: ICSSAttributes;
        closeClassName?: string;
        closeCSS?: ICSSAttributes;
    }

    interface VexDialog {
        confirm?: ((options: VexMessageOptions) => void);
        alert?: ((msg: string) => void);
    }

    interface Vex {
        open(options: IVexOptions): JQuery;
        close(id?: number): boolean;
        closeAll(): boolean;
        closeByID(id: number): boolean;

        dialog: VexDialog;
        defaultOptions: any;
    }

}

declare module "vex" {
    export = vex;
}

declare var vex: vex.Vex;
