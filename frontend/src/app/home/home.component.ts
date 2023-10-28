import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog,private router:Router,private userService:UserService) {}

  ngOnInit(): void {
    if(localStorage.getItem("token")!=null){
      this.userService.checkToken().subscribe((res:any)=>{
        this.router.navigate(['/cafe/dashboard']);
      },(err:any)=>{
        console.log(err);
      })
    }
  }

  signUpAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(SignupComponent, dialogConfig);
    // this.dialog.open(SignupComponent,{
    //   width:'550px',
    //   height:'500px'
    // })
  }
  forgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

  loginAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
