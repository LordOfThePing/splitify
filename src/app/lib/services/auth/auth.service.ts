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

    login(email: string, pass: string): [boolean, string] {
        var data = userStorage.getUser(email); 
        if (data === null){
            this.isAuthenticated$.next(false);
            return [false, 'That username does not exist']; 
        } else if (data.pass == pass){
            this.isAuthenticated$.next(true);
            return [true, "OK"]; 
        } else {
            this.isAuthenticated$.next(false);
            return [false, "Incorrect password"]; 
        }
    }

    register(email: string, pass: string, firstName: string, lastName: string): boolean {

        if (userStorage.getUser(email) != null) {return false;}; 

        userStorage.setUser(email, {pass, token: "abc", first_name: firstName, last_name: lastName}); 
        return true; 
    }

    logout(): void {
        userStorage.removeUser('user');
        this.isAuthenticated$.next(false);
    }
}
