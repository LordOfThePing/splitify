import { Injectable } from '@angular/core';
import { userStorage } from '@lib/utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isAuthenticated$ = new BehaviorSubject<boolean>(false);

    get isAuthenticated(): boolean {
        return this.isAuthenticated$.getValue();
    }

    login(_email: string, _pass: string): boolean {
        var data = userStorage.getUser(_email); 
        if (data === null){
            this.isAuthenticated$.next(false);
            return false; 
        } else if (data.pass == _pass){
            this.isAuthenticated$.next(true);
            return true; 
        } else {
            this.isAuthenticated$.next(false);
            return false; 
        }
        //    , { pass: _pass, token: _email + _pass + "token" });
    }

    logout(): void {
        userStorage.removeUser('user');
        this.isAuthenticated$.next(false);
    }
}
