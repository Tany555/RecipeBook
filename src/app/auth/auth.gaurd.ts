import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthServices } from "./auth.serivces";

@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate {
	
	constructor(private authservice : AuthServices, private route : Router){}
	
	canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot ): boolean|UrlTree | Promise<boolean|UrlTree> | Observable<boolean|UrlTree>{
		return this.authservice.userS.pipe(take(1),map(user=>{
			const isAuth =  !!user;
			if(isAuth){
				return true;
			}
			
			return this.route.createUrlTree(['/auth'])
			
		}))
	}	
	
	
}