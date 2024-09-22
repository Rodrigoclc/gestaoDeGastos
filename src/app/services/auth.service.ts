import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);

  user: any;
  erro: any;

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  authGuard() {
    return this.auth.user.pipe(  

      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      take(1)
    );
  }

  async login(email: string, senha: string): Promise<any> {
    try {

      const credencial = await this.auth.signInWithEmailAndPassword(email, senha);
      this.user = credencial.user!.multiFactor;
      this.router.navigate(['/']);
      return credencial.user!.multiFactor;
            
    } catch (error) {
      this.erro = error;
      return error;
    }
  }

  async googleSignin(): Promise<any> {
    try {
      
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.auth.signInWithPopup(provider);
      this.user = credential.user;
      this.router.navigate(['/']);
      return credential.user!.multiFactor;

    } catch (error) {
      this.erro = error;
      return error;
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.user = null;
    this.router.navigate(['/login']);
  }

  // private setUserSubject(user: any) {
  //   sessionStorage.setItem('user', btoa(JSON.stringify(user.user.email)));
  //   sessionStorage.setItem('token', btoa(JSON.stringify(user.user.accessToken)));
  //   this.userSubject.next(user);
  // }
}
