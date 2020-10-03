import { NgModule } from "@angular/core";
import { } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from "./app.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        UpgradeModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [

    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        
    ]
})
export class AppModule { }