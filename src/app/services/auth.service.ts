import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  ) { }

  async login(email: string, senha: string): Promise<any> {
    try {

      const credencial = await this.auth.signInWithEmailAndPassword(email, senha);
      this.user = credencial.user!.multiFactor;
      this.setUserSubject(this.user);
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
  }

  private setUserSubject(user: any) {
    sessionStorage.setItem('user', btoa(JSON.stringify(user.user.email)));
    sessionStorage.setItem('token', btoa(JSON.stringify(user.user.accessToken)));
    this.userSubject.next(user);
  }
}
