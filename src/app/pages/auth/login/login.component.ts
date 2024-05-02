import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '@lib/services';

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    @Input() returnUrl!: string;

    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);
    private _email: string | undefined;
    private _password: string | undefined;
    login(): void {
        this._email = (document.getElementById('email') as HTMLInputElement).value;
        this._password = (document.getElementById('password') as HTMLInputElement).value;
        console.log(this._email, this._password);
        const [loginOk, errorString] = this._authService.login(this._email, this._password); 
        if (!loginOk) {
            console.log("not logged"); 
            const formElement = <HTMLElement>document.getElementById('loginerrordiv');
            const pElement = <HTMLElement>document.getElementById('errorMessage');
            if (formElement != null) {
                formElement.className = formElement.className.replace(' hidden', '');
                pElement.replaceChildren('Incorrect password or username');
            }
        } else {
            console.log('logged');
            this._router.navigate([this.returnUrl ?? `/`]);
        }
    }
}
