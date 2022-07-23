import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { User } from "./user.model";


export interface AuthResponceData{
	
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
		
	}

@Injectable({providedIn: 'root'})
export class AuthServices{
	
  userS = new BehaviorSubject<User>(null);  
  private tokenExpirationTimer: any;
	    
	
	constructor(private http: HttpClient, private route : Router){
		
	} 
	
	SignUp(username: string, password: string){
		
		return this.http.post<AuthResponceData>
		('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0pmqg5DHHULL5Oe4oXETjFwO_kh7X8lc', 
		{email: username, password: password, returnSecureToken: true})
		.pipe(catchError(this.handleError))
		 console.log('this signup from service')
			
		
		
	}
	
	
	Signin(username: string, password: string) {
		
		return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0pmqg5DHHULL5Oe4oXETjFwO_kh7X8lc',
		{email: username, password: password, returnSecureToken: true})
		.pipe(catchError(this.handleError),
		tap(respData=>{
			this.handleAthentication(
				respData.email,
				respData.localId,
				respData.idToken,
				+respData.expiresIn
								
			);
			console.log('this login from service with handle authentication')
		})
		
		);
		
		
	}
	
	 autoLogin() {
    const userData: {
      email: string;
      userId: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.userId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.userS.next(loadedUser);
       const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
      
    }
  }
	
	Logout(){
		this.userS.next(null);
		this.route.navigate(['/auth'])
		localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
		
	}
	
	autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.Logout();
    }, expirationDuration);
  }
	
	
	private handleAthentication(email: string, userId: string, token: string, expiresIn: number){
		
		const expirationDate = new Date(new Date().getTime()+ expiresIn*1000);
		const user = new User(email, userId, token, expirationDate);
		 this.userS.next(user);
	 this.autoLogout(expiresIn * 1000);
		 localStorage.setItem('userData', JSON.stringify(user));
	
		
	}
	
	
	private handleError(errorResp : HttpErrorResponse){
		let errorMessage ='an UnknownError Occured'
		
		if(!errorResp.error || !errorResp.error.error){
			
			return throwError(errorMessage);
		}switch(errorResp.error.error.message){
			case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
		}
		
		
		return throwError(errorMessage);		
	}
	
}