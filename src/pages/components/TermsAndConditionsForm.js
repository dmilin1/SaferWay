import React, { Component } from 'react';
//import {Link } from 'react-router-dom';
import axios from 'axios';
import './SignUpForm.css';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export default class TermsAndConditionsForm extends Component{
    render(){
        return(
                <div className="FormCenter">
                    <div className="BoxSignUp">
                    <form className="FormField">
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="name">Terms and Conditions</label>
                                <h2>Service Provided:</h2>
                                  <p4 className = "terms-of-format">Saferway is a computer application that is designed for online grocery shopping.  This service will be provided
                                  “AS AVAILABLE”, with no guarantee of perfect service.  Saferway is only supplied with so many server hamsters (gerbils
                                    will not suffice).  Saferway is not meant to be used while driving or operating heavy machinery.  If you start to see
                                    more groceries delivered than usual to your home, stop using Saferway and contact an experienced grocer.
                                  </p4>
                                <h2>User Responsibilities:</h2>
                                  <p5 className = "terms-of-format">
                                    Saferway allows for the creation of personal user accounts for use of the checkout features of the application.
                                    By creating an account in Saferway there is no currently available method for password reset or account termination, so
                                    accounts must be used responsibly in a manner like beverages containing percentages of alcohol enough to intoxicate an average
                                    human of the species Homo Sapiens.  Additionally, Saferway requires the usage of appropriate, sensible usernames and passwords.
                                    Examples of unauthorized usernames include “REDACTED AS NOT TO GET IN TROUBLE IN CLASS” and “ALSO REDACTED, SO LET US TRY TO KEEP
                                    THIS DOCUMENT PG”.  The literal versions of those usernames are also not allowed.  Somehow managing to boldface those names too is
                                    technically not allowed but will be met with impressed looks for modifying the code for that.  Either way, same reprimanding’s will
                                    occur.
                                    Saferway features a payment system since groceries tend to be exchanged with “money”.  Users are not allowed to tamper with the code
                                    that controls transactions.  By accepting the Terms of Conditions any tampering with transaction management will be met with a stern
                                    reprimanding from the project leader of the application as the account termination system.
                                  </p5>
                                <h2>Products Offered:</h2>
                                  <p6 className = "terms-of-format">
                                    Saferway is designed to improve the purchase of grocery products.  If you experience images of milk being described as “cow liquid”,
                                    that is a unique feature of Saferway.  Saferway is not meant for the purchase of non-grocery products high-end electronics, furniture,
                                    garden implements, fusion reactors, tenant buildings, or time.  Happiness is an exception to non-grocery products, as foods such as
                                    chocolate and fried chicken are contributors to comfort and joy.
                                  </p6>
                                <h2>Copyrights:</h2>
                                  <p7 className = "terms-of-format">
                                    Saferway is currently copyrighted by the Dimitrie Milinovich Holding Company, Inc., LLC., Corp., Co.  The Saferway logo is technically
                                    a registered trademark that is constructed with blood, sweat, tears and Fair Use.  The color rgb (48, 81, 56) is also a registered trademark.
                                    The mentioned trademarks are only usable in situations regarding education, non-profit work, or parody; especially parody.
                                  </p7>
                        </div>
                    </form>
                    </div>
                </div>
        );
    }
}
