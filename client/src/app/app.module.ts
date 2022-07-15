import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from "@angular/material/tree";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvServiceProvider } from './env.service.provider';
import { TodoComponent } from './todo/todo.component';
import { HttpErrorInterceptor } from './../app/todo/http-error.interceptor';

const routes: Routes = [
  { path: ':status', component: TodoComponent },
  { path: '**', redirectTo: '/all' }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatGridListModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatListModule,
    MatTreeModule,
    MatIconModule
   
  ],
  providers: [
    {

      provide: HTTP_INTERCEPTORS,
 
      useClass: HttpErrorInterceptor,
 
      multi: true
 
    }
, 
    EnvServiceProvider,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
