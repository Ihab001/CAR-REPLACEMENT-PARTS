import { AppUser } from './models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from'firebase';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  error: string;
  user$:Observable<firebase.User>;
  constructor(private userService :UserService, private afauth :AngularFireAuth,private route: ActivatedRoute) {
    this.user$= this.afauth.authState;
   }

  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') ||'/';
    localStorage.setItem('returnUrl',returnUrl);
    
    this.afauth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);

  }
  loginfacebook(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') ||'/';
    localStorage.setItem('returnUrl',returnUrl);
    
    this.afauth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider);
  }
 
  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afauth.auth.createUserWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
    }
  );
  }

  loginEmail(email: string, pass: string)
   {
    return new Promise((resolve, reject) => {
      let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') ||'/';
      localStorage.setItem('returnUrl',returnUrl);
      this.afauth.auth.signInWithEmailAndPassword(email, pass)
      .then( userData =>  resolve(userData),
      err => reject (err));
    });
}

  logout(){
    this.afauth.auth.signOut();
  }
get appUser$(): Observable<AppUser>{
  return this.user$
  .switchMap(user=> {
    if(user) return this.userService.get(user.uid);
    return Observable.of(null);
  });
}
}
