import {Injectable} from '@angular/core';

@Injectable()
export class LogService {

    log = (text: string) => {
        console.log(text);
    };

    clear = () => {
        console.clear();
    }
}