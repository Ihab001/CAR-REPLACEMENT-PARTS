import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: any;
  public email: string;
  public password: string;
  constructor( private afAuth :AuthService) { }

  ngOnInit() {
  }
  onSubmitAddUser() {
    this.afAuth.registerUser(this.email, this.password).catch
    (error=>this.error=error.message);
    
  }
login(){
  this.afAuth.login();
}
loginfacebook()
{
  this.afAuth.loginfacebook();
}

}
