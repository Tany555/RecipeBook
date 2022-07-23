import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServices } from '../auth/auth.serivces';
import { DataStorageService } from '../shared/data-storage-services';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
	isAuthenticated=false;
	userSub : Subscription;
  
   constructor(private dataService : DataStorageService, private authService: AuthServices){}

ngOnInit(){
	
	this.userSub = this.authService.userS.subscribe(user=>{
		this.isAuthenticated= !!user;
	})
	
}

onLogout(){
	this.authService.Logout();
}


onSave(){
	
	this.dataService.storeData();
	
}

onFetch(){
	
	this.dataService.fetchData().subscribe();
	
}

ngOnDestroy(){
	this.userSub.unsubscribe();
}


}