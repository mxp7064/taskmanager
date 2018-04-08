import { Inject, Component, OnInit } from '@angular/core';
import { Task } from "../task";
import { TaskService } from "../task.service";
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from "../dialog/dialog.component";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    flag: boolean = false;
    tasks: Task[];
    tasksLength: number = 0;

    constructor(private taskService: TaskService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

    openDialog(): void {

    }

    ngOnInit() {
        this.getTasks();
    }

    hideTaskAdd() {
        this.flag = false;
        this.getTasks();
    }

    undoRefresh() {
        this.getTasks();
    }

    getTasks() {
        this.taskService.getTasks().subscribe(tasks => {
            this.tasks = tasks;
            this.tasksLength = this.tasks.length;
        });
    }

    addTaskFlag() {
        this.flag = true;
    }

    updateTask(task: Task) {
        console.log(task.checked);
        this.taskService.updateTask(task).subscribe(() => {
            this.openSnackBar("Task \"" + task.name + "\" updated!");
        });
    }

    deleteTask(task: Task) {

        let dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
            data: { message: "Delete task \"" + task.name + "\" ?" }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.taskService.deleteTask(task._id).subscribe(() => {
                    this.getTasks();
                    this.openSnackBar("Task \"" + task.name + "\" deleted!");
                });
            }
        });
    }

    openSnackBar(str: string) {
        let snackBarRef = this.snackBar.open(str, "Ok", {
            duration: 3000
        });
    }
}
