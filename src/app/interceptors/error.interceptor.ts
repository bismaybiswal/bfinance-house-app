import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private spinner : NgxSpinnerService,private authService: AuthService, private toastrService: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show()
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401) {
                    //alert("Session expired!");
                    this.toastrService.error("You are not authorized! Please login again")
                    
                }
                if(err.status === 500){
                    alert("Something went wrong")
                    this.toastrService.error("Something went wrong!")
                }
                if (err.status === 0 || err.status === 503) {
                    this.toastrService.error("Service is not available! Please try again later")
                }
                //const error = err.error.message || err.statusText;
                return throwError(err);
            }),
            finalize(() => {
                this.spinner.hide()
                return;
            })
        )
    }
}