import React, { useEffect } from 'react'; 
import ReactDOM from 'react-dom';
import { useState } from "react";

// Style Sheets
import styles from './my-style.module.css'; 
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('test'));

function Main() {

    // this toggles the login sing up styles...
    const [toggle, setToggle] = useState(true);

    // init values --> Sign Up
    const signUp = {email: '', password: '', checkPassword: ''};
    const [signValue, setSignValue] = useState(signUp);
    const [signError, setSignErrors] = useState({});
    const [isSigned, setIsSigned] = useState(false);

    // handling change --> Sign Up
    const handleChange = (e) => {

        const {name, value} = e.target;
        setSignValue({...signValue, [name]: value});

    };

    // handle Submit --> Sign Up
    const handleSignUp = (e) => {
        e.preventDefault();
        setSignErrors(validate(signValue));
        setIsSigned(true);
    };

    // validating the script TODO: --> we also need to check if the user is already signed up, so we need to make a function that handles such a request and a checkup and return a bool
    const validate = (value) => {
        const errors = {};
        if (!value.email) {
            errors.email = 'Required!';
        } else if (value.email.length < 7) {
            errors.email = 'Email must be at least 7 characters';
        }

        if (value.password === value.email) {
            errors.password = 'Password cannot be your email address!';
        }

        if (!value.password) {
            errors.password = 'Required!';
        } else if (value.password.length < 5) {
            errors.password = 'Password must be at least 5 characters';
        } else if (value.password !== value.checkPassword) {
            errors.password = 'Passwords do not match!';
        }

        // checking if the user already exits!
        //fetch('/check')
        //    .then(response => response.json())
        //    .then(data => this.setState({ totalReactPackages: data.total }));

        // checking if the user already exists

        const checkOut = async () => {
            const result = await fetch("/check", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(signValue)
            });

            return result;

        };

        ;(async () => {
            const is_user = await checkOut();

            console.log(is_user);

        })()

        return errors;

    }

    // login TODO: --> the template is already set up, you just need to handle the validation and request to get the stack

    // init values for checking the user..

    const logIn = {email: '', password: ''};
    const [logValue, setLogValue] = useState(logIn);
    const [logError, setLogError] = useState({});
    const [isLoged, setIsLoged] = useState(false);

    // handle login change

    const handleLoginChange = (e) => {
        const {name, value} = e.target;
        setLogValue({...logValue, [name]: value});
    }
    
    // handling errors

    const handleLogIn = (e) => {
        e.preventDefault();
        setLogError(validateLogin(logValue));
        setIsLoged(true);
    }

    // validate login

    const validateLogin = (value) => {
       
        const errors = {};
        
        // getting if the user is there or not

        // checking the stuff
        if (!value.email) {
            errors.email = 'Required!';
        }

        if (!value.password) {
            errors.password = 'Required!';
        }

        if (value.password === value.email) {
            errors.password = 'Password cannot be your email address!';
        }

        return errors;
    }

    // the final state of the user --> can handle multiple events both for sign up and login

    useEffect(() => {

        if (Object.keys(signError).length === 0 && isSigned) {
            setToggle(true);
            
            // placing the values inside the given stack
            let test = fetch("/save", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(signValue)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => {
                console.error(err);
            });

            // debug
            //console.log(test);

            if (test === false) {
                isSigned(false);
            }

            // resetting the values
            signValue.email = '';
            signValue.password = '';
            signValue.checkPassword = '';
        }

        if (Object.keys(logError).length === 0 && isLoged) {

            console.log("This worked");

            // resetting the values
            logValue.email = '';
            logValue.password = '';

        }

        }, [signError, logError]);

    // THE END OF MAIN

    return (
        // This is for when the user wants to login -- thus toggle is true in this case
        <div className={styles.PAGE}>

            <a href="#signup" className={toggle ? styles.exception4 : styles.exception5} onClick={() => setToggle(!toggle)}>I don't have an account!</a>
                {toggle && (

                    <div className={styles.login_box}>

                    <h1 className={styles.transition_exception}>Welcome!</h1>
                    <p className={styles.exception1}>Sign into your account!</p>

                        <form onSubmit={handleLogIn}>
                            <label>
                                <input type="text" name="name" placeholder="Email" autoComplete="off" className={styles.exception2} value={logValue.email}  onChange={handleLoginChange}/>
                                <p className={styles.error_box}>{logError.email}</p>

                                <input type="password" name="password" placeholder="Password" autoComplete="off" className={styles.exception3} value={logValue.password}  onChange={handleLoginChange}/>
                                <p className={styles.error_box}>{logError.password}</p>

                            </label>
                            <input type="submit" value="Submit" className={styles.submit} onChange={handleLoginChange}/>
                        </form>
                    </div>
                )}
                { // this is for when the user wants to sign up for the website 
                    !toggle && (

                        <div className={styles.PAGE}>
                            <div className={styles.signup_box}>

                            <h1 className={styles.transition_exception}>Welcome!</h1>
                            <p className={styles.exception1}>Let's create your account!</p>

                                <form onSubmit={handleSignUp}>
                                    <label>
                                        <input type="text" name="email" placeholder="Email" autoComplete="off" className={styles.exception2} value = {signValue.email} onChange = {handleChange}/>
                                        <p className={styles.error_box}>{signError.email}</p>

                                        <input type="password" name="password" placeholder="Password" autoComplete="off" className={styles.exception3} value = {signValue.password} onChange = {handleChange} />
                                        <p className={styles.error_box}>{signError.password}</p>

                                        <input type="password" name="checkPassword" placeholder="Check Password!" autoComplete="off" className={styles.exception3} value = {signValue.checkPassword} onChange = {handleChange} />
                                    </label>
                                    <input type="submit" value="Submit" className={styles.submit}  onChange = {handleChange}  />
                                </form>
                            </div>
                    </div>
                )}
        </div>
    );
}

root.render(<Main />);
