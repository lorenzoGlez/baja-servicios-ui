import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { UserService } from '../../services/user.service';
import { TOKEN_NAME } from '../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if (this.tokenNotExpired(TOKEN_NAME, this.userService.accessToken)) {
      return true;
    } else {
      this.router.navigate(['login'], {queryParams: {redirectTo: state.url}});
      return false;
    }
  }

  private tokenNotExpired(tokenName: String, accessToken: String){
    return  accessToken != null && accessToken != '';
  }
}
