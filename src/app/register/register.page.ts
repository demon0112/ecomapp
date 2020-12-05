
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'


import { AngularFirestore } from '@angular/fire/firestore'

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  name    : string=""
  email: string=""
	password: string = ""
  cpassword: string = ""
  

	constructor(
    public afAuth: AngularFireAuth,
    public alertController: AlertController,
    public router: Router
		) { }

	ngOnInit() {
	}


	async register() {
		const { username, name ,email,password, cpassword } = this
		if(name==null)
			{
				this.showAlert("Oh","Name is Mandatory")
				return console.error("Name not present")
			}
		if(password !== cpassword) {
      this.showAlert("Error","Passwords dont match")
			return console.error("Passwords don't match")
		}

		try {
		
			const res = await this.afAuth.createUserWithEmailAndPassword(email, password)
      console.log(res)
      this.showAlert("Success","You have onboarded finally")
      this.router.navigate(['/items'])
		} catch(error) {
      console.dir(error)
      this.showAlert("Error",error.message)
		}
  }
  async showAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}
  }

