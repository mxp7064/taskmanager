import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from "./tasks/tasks.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";

const routes: Routes = [
    { path: 'tasks', component: TasksComponent },
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'task/:id', component: TaskDetailComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {

}


