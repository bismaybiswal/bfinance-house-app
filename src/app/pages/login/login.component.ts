import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;
  redirectUrl = '';
  invalidSignIn = false;
  signInBtn = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      pin: ['', Validators.compose([Validators.required])]
    });
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params.redirectUrl;
    });
  }
  ngOnDestroy() {
  }

  signIn() {
    this.signInBtn = true;
    if (this.signInForm.invalid) {
      this.signInBtn = false;
      return;
    }
    let payload = {
      pin: this.signInForm.controls.pin.value
    }

    this.authService.login(payload).subscribe(data => {
      console.log(data);
      window.sessionStorage.setItem('token', data["access_token"]);
      //navigating
      if (this.redirectUrl === '' || this.redirectUrl === undefined) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate([this.redirectUrl]);
      }
    }, (error) => {
      this.signInBtn = false;
      if (error.status === 400) {
        this.signInBtn = false;
        this.signInForm.reset();
        this.invalidSignIn = true;
      }
    });
  }

}
