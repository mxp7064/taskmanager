import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './task.service';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule } from '@angular/forms';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { HttpClientModule } from "@angular/common/http";
import { TaskAddComponent } from './task-add/task-add.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [
        AppComponent,
        TasksComponent,
        TaskDetailComponent,
        TaskAddComponent,
        DialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularDateTimePickerModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        HttpClientModule,
        MatDialogModule,
        MatFormFieldModule,
        MatCheckboxModule
    ],
    providers: [TaskService, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }],
    bootstrap: [AppComponent],
    entryComponents: [
        DialogComponent
    ]
})
export class AppModule { }
