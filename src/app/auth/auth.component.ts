import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponceData, AuthServices } from "./auth.serivces";

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html'
})
export class AuthComponent{
	isLoggedinMode = true;
	isLoading=false;
	error : string;
	
	
	constructor(private authServices: AuthServices, private route : Router){}
	
	SwithingMode(){
		
		this.isLoggedinMode=!this.isLoggedinMode;
		
	}
	
	
	onSubmit(form: NgForm){
		
		if(!form.valid){
			return;
		}
		
		const username=form.value.username;
		const password=form.value.password;
		
		let authObs: Observable <AuthResponceData>;
		
		this.isLoading=true;
		
		if(this.isLoggedinMode){
			authObs=this.authServices.Signin(username, password);
			console.log('this is sigin')
		}else{
			authObs=this.authServices.SignUp(username, password);
			console.log('this is signUp')
		}
		
		authObs.subscribe(resData=>{
			console.log(resData)
			this.isLoading=false;
			this.route.navigate(['/recipe']);
			
		},errorMessage=>{
			console.log(errorMessage);
			this.error=errorMessage;
			this.isLoading=false;
		})
		
	}
}