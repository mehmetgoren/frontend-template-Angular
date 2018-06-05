import { UserLocal } from '../models/entities';
import { Toolbox }  from "../utils/toolbox"

export module AppStorage{

    export const Host = "http://192.168.0.21:1983";
    const Server = "";//"/Server.REST";
    export const ServerAddress = Host + Server;

    // var user;
    export function getUser(): UserLocal {
        let localData: string = sessionStorage.getItem(ServerAddress + "_user");
        if (localData) {
            return JSON.parse(atob(localData));
        }
        return null;
    }
    export function setUser(user: UserLocal) {
        if (user) {
            sessionStorage.setItem(ServerAddress + "_user", btoa(JSON.stringify(user)));
        }
    }
    export function logOut() {
        //clearTokenFromStorage();
        sessionStorage.removeItem(ServerAddress + "_user");
        window.location.href = "";
    }
    export function getUserIfNotAuthenticatedThenLogOut(): UserLocal {
        let u = getUser();
        if (!u) {
            Toolbox.showError("access denied");
            logOut();
            throw new Error("access denied")
        }
        return u;
    }

    export function getToken(): string{
        const user = getUser();
        if (user)
            return user.Token;
        
        return null;    
    }

       // private static _token : string;
    // export function getTokenFromStorage(): string {
    //     //return BaseService._token;
    //     return sessionStorage.getItem(Server + "_ionixapitoken");
    // }
    // export function setTokenToStorage(token: string): void {
    //     //BaseService._token = token;
    //     sessionStorage.setItem(Server + "_ionixapitoken", token);
    // }
    // export function clearTokenFromStorage(): void {
    //     //BaseService._token = null; 
    //     sessionStorage.removeItem(Server + "_ionixapitoken");
    // }
}