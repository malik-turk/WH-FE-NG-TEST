/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, EventEmitter, NgModule, Output  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'textfield',
    template : '<input (change)="onValueChange()" type="text" [(ngModel)]="field" />'
})
export class TextField {
    @Output() inputValue: EventEmitter<string> = new EventEmitter<string>();

    field = "";

    onValueChange(): void {
        this.inputValue.emit(this.field);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title: {{ title }} <h2><br/><textfield (inputValue)="onValueChange($event)"></textfield>`
})
export class ChildComponent {
    @Output() childValue: EventEmitter<string> = new EventEmitter<string>();
    title = '';

    onValueChange(value: string): void {
        this.childValue.emit(value);
        this.title = value;
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (childValue)="handleChildValue($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";

    handleChildValue(value: string) {
        this.title = value;
    }
}

@NgModule({
    imports : [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};
