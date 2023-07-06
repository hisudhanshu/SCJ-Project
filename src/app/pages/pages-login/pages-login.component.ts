import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {
  formGroup!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authServices: AuthServicesService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.authServices.login(this.formGroup.value).subscribe(result => {
        if (result.message == 'Login Successful') {
          console.log(result);
          var myToken = result.token;
          window.localStorage.setItem("myToken", JSON.stringify(myToken));
          myToken = JSON.parse(localStorage.getItem('myToken') || '{}');
  
          this.authServices.setToken(myToken);
  
          this.router.navigateByUrl('/dashboard');
        } else {
          this.errorMessage = result.message;
          this.successMessage = '';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      }, error => {
        this.errorMessage = 'An error occurred during login. Please try again.';
        this.successMessage = '';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      });
    }
  }

  dismissSuccess() {
    this.successMessage = '';
  }

  dismissError() {
    this.errorMessage = '';
  }
}