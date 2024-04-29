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
    async login(): Promise<void> {
        this._email = document.getElementById('email')?.nodeValue as string;
        this._password = document.getElementById('password')?.nodeValue as string;
        if (!this._authService.login(this._email, this._password)) {
            var formElement = <HTMLElement>document.getElementById('loginerrordiv');
            var pElement = <HTMLElement>document.getElementById('errorMessage');
            if (formElement != null) {
                formElement.className = formElement.className.replace(" hidden", "");
                pElement.replaceChildren("Incorrect password or username"); 
            }
        } else {
            console.log("login");
            this._router.navigate([this.returnUrl ?? `/`]);
        }
    }
}