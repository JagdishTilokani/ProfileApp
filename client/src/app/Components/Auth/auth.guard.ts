import { AuthService } from 'src/app/Services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // return true;
    
    try {
      const isAdmin = await this.auth.isAdmin();
      if (isAdmin)
        return true
      else
        throw Error("");
    }

    catch (err) {
      return this.router.parseUrl("/");
    }

  }
  
}
