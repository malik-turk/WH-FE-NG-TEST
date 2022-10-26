/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Errors = {
    email?: boolean;
    password?: boolean;
    general?: string;
}

@Component({
    selector : 'ng-app',
    template : `<form (submit)="handleValidation($event)">
                    <h2>Login</h2>
                    <br/>
                    <input type="email" [(ngModel)]="email" value="" name="email" />
                    <small *ngIf="errors.email">Email is invalid</small>
                    <br/>
                    <input type="password" [(ngModel)]="password" value="" name="password" />
                    <small *ngIf="errors.password">Password is invalid</small>
                    <br />
                    <button type="submit">Submit</button>
                    <small *ngIf="errors.general">{{ errors.general }}</small>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    email: string = "";
    password: string = "";
    errors: Errors = {};

    logged_in = false;

    /**
     * Validate email on submit
     * @param {string} email email passed by the form
     * @returns 
     */
    validateEmail = (email: string): boolean => {
        const emailRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return emailRegex.test(email);
    };

    /**
     * Validate password on submit
     * @param {string} password password passed by the form
     * @returns 
     */
    validatePassword = (password: string): boolean => {
        const passwordRegex = new RegExp(
            /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
        );
        return passwordRegex.test(password);
    };

    handleValidation(e: Event): void {
        e.preventDefault();

        this.errors.email = !this.validateEmail(this.email);
        this.errors.password = !this.validatePassword(this.password);

        if (!this.errors.email && !this.errors.password) {
            this.logged_in = true;
        }
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};
