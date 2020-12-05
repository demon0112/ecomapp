import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {User} from '@firebase/auth-types';
import { Firebase } from 'ionic-native';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  email: string = "";
 
  private user: Observable<User>;
  public userData: User = null;
  constructor(public afAuth: AngularFireAuth) { 
      this.user = afAuth.authState;
      this.user.subscribe(
        (user) => {
          if (user) {
            this.userData = user;
            console.log(this.userData.email);
            this.email=this.userData.email;
          } else {
            this.userData = null;
          }
        }
      );
    }
     
 
 
  ngOnInit() {
    console.log('in profile');
console.log(this.userData);

  }

}
