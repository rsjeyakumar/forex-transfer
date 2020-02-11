import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodCartService {
  apiURL = 'http://10.117.189.198:8085';
  showAlert;
  loginAPI = `${this.apiURL}/homeslice/customers/login`;
  viewAllItemsAPI = `${this.apiURL}/homeslice/items`;
  customersAPI = `${this.apiURL}/homeslice/customers`;


constructor(private http: HttpClient) {
}

/* Http Headers */
httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};

/*
* @param data
* Validate Login API
* POST Method
* Type Object
*/
checkLogin(data): Observable < any > {
  return this.http.post(this.loginAPI, data, this.httpOptions).pipe(
    catchError(this.errorHandler.bind(this))
  );
}

/*
* @param data
* Get All Items
* POST Method
* Type Object
*/
getAllItems(): Observable < any > {
  return this.http.get(this.viewAllItemsAPI, this.httpOptions).pipe(
    catchError(this.errorHandler.bind(this))
  );
}


/*
  * @param data
  * Get All Items
  * POST Method
  * Type Object
  */
viewOrderHistory(customerid): Observable < any > {
  return this.http.get(`${this.customersAPI}/${customerid}`, this.httpOptions).pipe(
    catchError(this.errorHandler.bind(this))
  );
}


/*
  * @param data
  * Get All Items
  * POST Method
  * Type Object
  */
addPreference(data, customerid): Observable < any > {
  return this.http.post(`${this.customersAPI}/${customerid}/preferences`, data, this.httpOptions).pipe(
    catchError(this.errorHandler.bind(this))
  );
}


/*
  * @param data
  * Get All Items
  * POST Method
  * Type Object
  */
viewPreference(customerid): Observable < any > {
  return this.http.get(`${this.customersAPI}/${customerid}/preferences`, this.httpOptions).pipe(
    catchError(this.errorHandler.bind(this))
  );
}

/*
  * @param data
  * Get All Items
  * POST Method
  * Type Object
  */
placeOrder(data, customerid): Observable < any > {
  return this.http.post(`${this.customersAPI}/${customerid}/orders`, data, this.httpOptions).pipe(
    catchError(this.errorHandler.bind(this))
  );
}

  /*
     * @param error
     * Error Handling
     */
  private errorHandler(error) {
  let errorMessage = '';
  this.showAlert = {};
  if (error.error instanceof ErrorEvent) {
    /* Get client-side error */
    errorMessage = error.error.message;
  } else {
    /* Get server-side error */
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  // console.log(error.error.message);
  this.showAlert = this.modalConfig(error.error.message ? error.error.message : 'Network Error', true);
  return throwError(errorMessage);
}
  /*
   * @param No Param
   * Check user is valid or not
   * Type boolean
   */
  public validUser() {
  const user = JSON.parse(sessionStorage.getItem('currentUser'));
  if (user) {
    return true;
  } else {
    return false;
  }
}

  /*
   * @param message, modal
   * Set Modal Properties
   */
  public modalConfig(mesg, modal) {
  return {
    // header: head,
    message: mesg,
    modalShow: modal
  };
}
}
