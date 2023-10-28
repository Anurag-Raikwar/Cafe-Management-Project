import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any = FormGroup;
  responseMessage:any;
  constructor(private formBuilder:FormBuilder,private userService:UserService,private dialogRef:MatDialogRef<LoginComponent>,
    private ngxService:NgxUiLoaderService,private snackbarService:SnackbarService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,Validators.required]
    })
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email : formData.email,
      password:formData.password
    }

    this.userService.login(data).subscribe((res:any)=>{
      this.ngxService.stop();
      this.responseMessage = res?.message;
      this.dialogRef.close();
      localStorage.setItem("token",res.token);
      // this.router.navigate(['/cafe/dashboard']);
      setTimeout(() => {
        this.router.navigate(['/cafe/dashboard']);
      }, 1000);
      this.snackbarService.openSnackBar(this.responseMessage,"");
      
    },(err)=>{
      this.ngxService.stop();
      if (err.error?.message) {
        this.responseMessage = err.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }

      this.snackbarService.openSnackBar(
        this.responseMessage,
        GlobalConstants.error
      );
    })

  }
}
