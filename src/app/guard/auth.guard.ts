import {CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = new Router();
  let required_role = route.data['requiredRole']
  if(required_role.includes('not_logged') && sessionStorage.length == 0){
    return true;
  }
  if(sessionStorage.length != 0){
    let userRole: string = sessionStorage.getItem('role')
    if(route.data['requiredRole'].includes(userRole)){
      return true;
    }else{
      if(userRole=='admin'){
        router.navigate(['admin']);
      }else if(userRole == 'librarian'){
        router.navigate(['librarian']);
      }else if(userRole == 'user'){
        router.navigate(['user']);
      }
      return false;
    }
  } else {
    router.navigate(['/']);  // User is not logged in, redirect to the login page
    return false;
  }
};
