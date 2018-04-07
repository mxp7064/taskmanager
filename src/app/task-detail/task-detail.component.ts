import { Component, OnInit, Input } from '@angular/core';
import { Task } from "../task";

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TaskService } from '../task.service';
import { MatSnackBar } from '@angular/material';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from "../dialog/dialog.component";

@Component({
    selector: 'app-task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

    task: Task = new Task("", "", "", new Date(), false);
    date: Date = new Date();
    settings = {
        bigBanner: true,
        format: 'dd-MMM-yyyy hh:mm a',
        defaultOpen: false,
        timePicker: true
    }
    constructor(private route: ActivatedRoute,
        private taskService: TaskService,
        private location: Location,
        public snackBar: MatSnackBar,
        public dialog: MatDialog) { }

    ngOnInit(): void {
        this.getTask();
    }

    getTask(): void {
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
        this.taskService.getTask(id)
            .subscribe(task => this.task = task);
    }

    openSnackBar(task: Task) {
        let snackBarRef = this.snackBar.open("Task \"" + task.name + "\" successfully added!", "Undo", {
            duration: 3000
        });

        snackBarRef.onAction().subscribe(() => {
            this.taskService.deleteTask(task._id).subscribe(() => {

            });

        });
    }

    onDateSelect() {

    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.taskService.updateTask(this.task).subscribe(() => {
            let snackBarRef = this.snackBar.open("Task \"" + this.task.name + "\" successfully updated!", "Go to task list", {
                duration: 3000
            });

            snackBarRef.onAction().subscribe(() => {
                this.goBack();

            });
        });
    }

    delete(): void {
        let dialogRef = this.dialog.open(DialogComponent, {
           // width: '250px',
            data: { message: "Delete task \"" + this.task.name + "\" ?" }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.taskService.deleteTask(this.task._id).subscribe(() => {
                    let snackBarRef = this.snackBar.open("Task \"" + this.task.name + "\" deleted!", "Ok", {
                        duration: 3000
                    });

                    this.goBack();
                });
            }
        });
    }

}
