import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	email: string = ""
	password: string = ""

  constructor (public alertController: AlertController,
    public afAuth: AngularFireAuth,
    public router: Router) { }

	ngOnInit() {
	}

	async login() {
		const { email, password } = this
		try {
			// kind of a hack. 
			const res = await this.afAuth.signInWithEmailAndPassword(email, password)
      console.log(res)
      this.showAlert("Congrats!!","you have successfully logged in");
      this.router.navigate(['/items'])
		} catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
        console.log("User not found")
        this.showAlert("Whoops","you have to register")
        this.router.navigate(['/register'])
      }
      else if(err.code=="auth/wrong-password"){
        console.log("Invalid password")
        this.showAlert("whoops","enter valid password")
        
      }
      else if(err.code=="auth/invalid-email"){
        console.log("Enter valid email")
        this.showAlert("whoops","enter valid email")
        
      }
      
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