import { Component, OnInit, EventEmitter } from '@angular/core';
import { Task } from "../task";
import { TaskService } from '../task.service';
import { MatSnackBar } from '@angular/material';
import { TasksComponent } from "../tasks/tasks.component";

@Component({
    selector: 'app-task-add',
    templateUrl: './task-add.component.html',
    styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
    task: Task;
    date: Date = new Date();
    settings = {
        bigBanner: true,
        format: 'dd-MMM-yyyy hh:mm a',
        defaultOpen: false,
        timePicker: true
    }
    constructor(private taskService: TaskService, public snackBar: MatSnackBar, private tasksComp: TasksComponent) {
        this.task = new Task("", "", "", new Date(), false);
    }

    openSnackBar(task: Task) {
        let snackBarRef = this.snackBar.open("Task \"" + task.name + "\" successfully added!", "Undo", {
            duration: 3000
        });

        snackBarRef.onAction().subscribe(() => {
            this.taskService.deleteTask(task._id).subscribe(() => {
                this.tasksComp.getTasks();
            });

        });
    }

    ngOnInit() {

    }

    addTask() {
        this.taskService.addTask(this.task).subscribe((returnedTask) => {
            this.tasksComp.hideTaskAdd();
            this.openSnackBar(returnedTask);
        });
    }

    cancel() {
        this.tasksComp.hideTaskAdd();
    }

}