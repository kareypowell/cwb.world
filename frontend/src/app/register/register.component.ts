import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterForm } from '../register-form';
import { AuthService } from '../auth-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerDetails = new RegisterForm();
  constructor(private _auth:AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }
  wid = '99%';
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: this.wid,
      data: { dialogModeTos:true }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.registerDetails.readTOS = result;
    });
  }
  errors:string[] = ['Wrong email format'];

  submitRegister(){
    this._auth.register(this.registerDetails.email,this.registerDetails.password);
  }
}
