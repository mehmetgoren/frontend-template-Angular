declare interface DatamapOptions {
    element?: HTMLElement;
    scope?: string;
    geographyConfig?: DatamapGeographyConfigOptions;
    bubblesConfig?: DatamapBubblesConfigOptions;
    arcConfig?: DatamapArcConfigOptions;
    setProjection?: (element: HTMLElement, options: DatamapOptions) => DatamapProjection;
    fills?: { defaultFill?: string, [key: string]: string };
    done?: (datamap: {
        svg: any,
        options: DatamapOptions,
        path: any;
        projection: any;
    }) => void;
    responsive?: boolean;
    projection?: string;
    height?: null | number;
    width?: null | number;
    dataType?: "json" | "csv";
    dataUrl?: null | string;
    data?: any;
    filters?: any;
    aspectRatio?: number;
    projectionConfig?: { rotation: any[] };
}

declare interface DatamapGeographyConfigOptions {
    dataUrl?: null | string;
    hideAntarctica?: boolean;
    hideHawaiiAndAlaska?: boolean;
    borderWidth?: number;
    borderOpacity?: number;
    borderColor?: string;
    popupTemplate?: (geography: DatamapGeographyData, data: any) => string;
    popupOnHover?: boolean;
    highlightOnHover?: boolean;
    highlightFillColor?: string;
    highlightBorderColor?: string;
    highlightBorderWidth?: number;
    highlightBorderOpacity?: number;
}

declare interface DatamapBubblesConfigOptions {
    borderWidth?: number;
    borderOpacity?: number;
    borderColor?: string;
    popupOnHover?: boolean;
    radius?: null | number,
    popupTemplate?: (geography: DatamapGeographyData, data: DatamapBubbleDatum) => string;
    fillOpacity?: number;
    animate?: boolean,
    highlightOnHover?: boolean;
    highlightFillColor?: string;
    highlightBorderColor?: string;
    highlightBorderWidth?: number;
    highlightBorderOpacity?: number;
    highlightFillOpacity?: number;
    exitDelay?: number;
    key?: any; //JSON.stringify
}

declare interface DatamapArcConfigOptions {
    strokeColor?: string;
    strokeWidth?: number;
    arcSharpness?: number;
    animationSpeed?: number;
    popupOnHover?: boolean;
    popupTemplate?: (geography: DatamapGeographyData, data: any) => string;
}

declare interface DatamapGeographyData {
    properties: { name: string, iso:string };
}

declare interface DatamapProjection {
    path: any;
    projection: any;
}

declare interface DatamapBubbleDatum {
    latitude: number;
    longitude: number;
    radius: number;
    fillKey?: string;
    borderColor?: string;
    borderWidth?: number;
    borderOpacity?: number;
    fillOpacity?: number;
    [key: string]: any;
}

declare interface DatamapLabelOptions {
    labelColor?: string;
    lineWidth?: number;
    fontSize?: number;
    fontFamily?: string;
    customLabelText: any;
}

declare interface DatamapArcDatum {
    origin: string | {
        latitude: number, longitude: number
    };
    destination: string | {
        latitude: number, longitude: number
    };
    options?: {
        strokeWidth?: number;
        strokeColor?: string;
        greatArc?: boolean;
    };
}

declare class Datamap {
    constructor(options: DatamapOptions);
    legend(): void;
    updateChoropleth(data: string | any | null, options?: { reset: boolean, data: any }): void;
    bubbles(data: ReadonlyArray<DatamapBubbleDatum>, opts?: DatamapGeographyConfigOptions): void;
    labels(options?: DatamapLabelOptions): void;
    resize(): void;
    arc(data: ReadonlyArray<DatamapArcDatum>, options?: DatamapArcConfigOptions): void;
    latLngToXY(lat: number, lng: number): any;
    addLayer(className: string, id: string, first: boolean): SVGElement;
    updatePopup(element: HTMLElement, d: DatamapGeographyData, options: DatamapGeographyConfigOptions): string;
    addPlugin(name: string, pluginFn: Function): void;

    //extended
    graticule(): void;
}

interface JQuery {
    datamaps(options: DatamapOptions): void;
}

//extended
