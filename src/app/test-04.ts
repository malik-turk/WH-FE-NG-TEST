/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user,
 * and user has clicked out of the fields
 * then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
                <div>
                    <form>
                        <label>First Name</label>
                        <input type="text" [(ngModel)]="firstName" (blur)="generateUserName()" name="firstName" />
                        <br />
                        <label>Last Name</label>
                        <input type="text" [(ngModel)]="lastName" (blur)="generateUserName()" name="lastName" />
                        <br />
                        <small *ngIf="shouldShowError"l>Both first name and last name should be filled!</small>
                        <h2>{{ generatedUserName }}</h2>
                    </form>
                </div>
                `,
    styles : []
})
export class UserNameComponent {
    firstName = '';
    lastName = '';
    generatedUserName = '';
    shouldShowError = false;

    /**
     * Generate a random number between min and max
     * @param {number} min
     * @param {number} max 
     * @returns {number}
     */
    randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    /**
     * Generate username based on first name and last name
     * @returns {void}
     */
    generateUserName() {
        if (!this.firstName || !this.lastName) {
            this.shouldShowError = true;
            return;
        }

        this.shouldShowError = false;
        this.generatedUserName = `${this.firstName.toLowerCase()}_${this.lastName.toLowerCase()}_${this.randomIntFromInterval(0, 9)}`;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};
