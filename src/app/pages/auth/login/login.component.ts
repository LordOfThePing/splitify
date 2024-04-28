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
        this._email = document.getElementById('email')?.nodeValue as string;
        this._password = document.getElementById('password')?.nodeValue as string;
        console.log(this._email);
        console.log(this._password);
        if (this._email === undefined || this._password === undefined) {
            this._router.navigate([this.returnUrl ?? `/auth/login`]);
        }
        this._authService.login(this._email, this._password);

        this._router.navigate([this.returnUrl ?? `/`]);
    }
}
