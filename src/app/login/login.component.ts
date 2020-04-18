import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  public email: string;
  public password: string;
  constructor( private afAuth :AuthService) { }

  ngOnInit() {
  }
  onSubmitAddUser() {
    this.afAuth.loginEmail(this.email, this.password).
    catch(error=>this.error= error.message);
    
  }
login(){
  this.afAuth.login();
}
loginfacebook()
{
  this.afAuth.loginfacebook();
}

}
