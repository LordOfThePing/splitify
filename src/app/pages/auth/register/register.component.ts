import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@lib/services';

@Component({
    standalone: true,
    imports: [CommonModule],
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    @Input() returnUrl!: string;

    private readonly _router = inject(Router);
    private readonly _authService = inject(AuthService);
    private _email: string = "";
    private _pass: string = "";
    private _reptPass: string = "";
    private _firstName: string = "";
    private _lastName: string = "";
    private _validEmail: boolean = false;
    private _passMatch: boolean = false;
    register(): void {
        this._firstName = getAndShowErrorIfEmpty('grid-first-name');
        this._lastName = getAndShowErrorIfEmpty('grid-last-name');
        this._pass = getAndShowErrorIfEmpty('grid-password');
        this._reptPass = getAndShowErrorIfEmpty('grid-repeat-password');
        this._validEmail = this.emailFormatIsCorrect();  
        this._passMatch = isEqual(this._pass, this._reptPass);
        if (!this.validParams()) {return;} 

        if (!this._authService.register(
            this._email, 
            this._pass, 
            this._firstName, 
            this._lastName, 
        )) {
            this.emailError();
            return; 
        }
        console.log(this._email,this._pass,this._firstName,this._lastName );
        this._router.navigate([this.returnUrl ?? `/auth/login`]);
    }
    emailError() {
        const elm = document.getElementById('grid-email') as HTMLInputElement;
        const elmError = document.getElementById('grid-email-error') as HTMLParagraphElement; 
        elmError.textContent = 'email is already registered';
        elm.className = elm.className.replace('border-gray-200', 'border-red-500'); 
        elmError.className = elmError.className.replaceAll(' hidden', '');

    }
    validParams() : boolean {
        if ((!this._email) || (!this._firstName) || (!this._lastName) || (!this._pass) || (!this._reptPass)) {return false;}
        else if (!this._validEmail || !this._passMatch) {return false;}
        else {return true;}
    }
    emailFormatIsCorrect() : boolean {
        const elm = document.getElementById('grid-email') as HTMLInputElement;
        const elmError = document.getElementById('grid-email-error') as HTMLParagraphElement; 
        if (!elm.value) {
            elmError.textContent = 'Please fill out this field';
            elm.className = elm.className.replace('border-gray-200', 'border-red-500'); 
            elmError.className = elmError.className.replaceAll(' hidden', '');
            return false; 
        } else if (elm.value.search(new RegExp('.*@.*\..*')) < 0){
            elmError.textContent = 'Email format must be \"email@domain.abc\"';
            elm.className = elm.className.replace('border-gray-200', 'border-red-500'); 
            elmError.className = elmError.className.replaceAll(' hidden', ''); 
            return false; 
        } else {
            this._email = elm.value;
            elm.className = elm.className.replace('border-red-500', 'border-gray-200'); 
            elmError.className = elmError.className.replaceAll(' hidden', ''); 
            elmError.className = elmError.className + ' hidden';
            return true; 
        }
    }
}
function isEqual(pass: string, reptpass: string) : boolean {
    const elmError = document.getElementById('grid-repeat-password-error') as HTMLParagraphElement; 
    if (!reptpass || !pass) {
        return false;
    } else if (pass != reptpass){
        elmError.textContent = 'Passwords must be equal';
        elmError.className = elmError.className.replaceAll(' hidden', ''); 
        return false; 
    } else {
        elmError.className = elmError.className.replaceAll(' hidden', ''); 
        elmError.className = elmError.className + ' hidden';
        return true; 
    }
}

function getAndShowErrorIfEmpty(id: string): string  {
    const elm = document.getElementById(id) as HTMLInputElement;
    const elmError = document.getElementById(id + '-error') as HTMLElement;
    if (!elm.value) {
        elmError.textContent = 'Please fill out this field';
        elm.className = elm.className.replace('border-gray-200', 'border-red-500'); 
        elmError.className = elmError.className.replaceAll(' hidden', '');
        return "";
    } else {
        elm.className = elm.className.replace('border-red-500', 'border-gray-200'); 
        elmError.className = elmError.className + ' hidden';
        return elm.value;
    }
}


