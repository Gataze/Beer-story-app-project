import { useState } from "react";
import styled from "styled-components";
import { loginUser } from "../store/beersAuth";
import { useDispatch, useSelector } from "react-redux";
import { setLoginFormValue, setUserAgeVerified, setPasswordForgotForm } from "../store/beersStyles";
import ResetPassword from "./ResetPassword";



//Component with login form and its own frontend logic.
const LoginPage = () => {

    const dispatch = useDispatch();

    //If true show login form.
    const setLoginShow = useSelector(state => state.entities.styles.loginShow);

    // Value indicating if user is verified.
    const emailVerified = useSelector(state => state.entities.styles.emailVerificationMessage);

    // If true show ResetPassword component/hide LoginForm component.
    const passwordForgot = useSelector(state => state.entities.styles.passwordForgot);

    //Sign-in: when user password or email are wrong when signing-in, the 'error' will store msg for the user that password or email are wrong
    const error = useSelector(state => state.entities.auth.error);

    //Sets/changes email/password from inputs while user writes.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Hides login form
    const hideForm = () => {
        dispatch(setLoginFormValue()) 
    }

    //Hides/shows - forgot pasword/login component.
    const showForgotPassword = () => {
        dispatch(setPasswordForgotForm(true))
    }


       
    //Dispatches functions responsible for signing user in. Function setLoginFormValue sets login value in redux store as true meaning that the user is logged in.
    const login = (e, email, password) => {
        e.preventDefault();
        
        dispatch(loginUser(email, password, emailVerified))
        dispatch(setUserAgeVerified(true)) 

        // Clear input fields...
        setEmail('')
        setPassword('')   
    }

    return ( 
        <LoginPageContainer setLoginShow={setLoginShow}>
            <LoginForm passwordForgot={passwordForgot}>
            <p onClick={hideForm}>X</p>
            <h2>Logowanie do BeerStory</h2>
                <Form onSubmit={(e) => login(e, email, password)}>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Hasło: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button >Zaloguj</button>
                    <span onClick={showForgotPassword}>Zapomniałeś hasła?</span>
                    <i>{error}</i>
                </Form>
                <span>Użyj konta testowego lub utwórz nowe konto.</span>
                <span>Konto testowe: email: 3cf2zsnz@freeml.net  hasło: test1234</span>
            </LoginForm>
            <ResetPassword />
            
        </LoginPageContainer>
        
     );
}
 
export default LoginPage;


const LoginPageContainer = styled.div`
    display: ${({setLoginShow}) =>  setLoginShow? 'flex' : 'none' };
    position: fixed;
    z-index: 9999;
    top: 0px;
    box-sizing: border-box;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding: 20px;
    background-color: rgba(46, 49, 49, 0.9);
    color: white;

    span {
        
        align-self: center;
        margin: 0;
    }
    
`


const LoginForm = styled.section`
    display: ${({passwordForgot}) => !passwordForgot? 'block' : 'none'};
    width: 300px;

    p {
        display: flex;
        position: absolute;
        top: 5px;
        right: 10px;
        justify-content: flex-end;
        cursor: pointer;
        
    }
    
`


const Form = styled.form`
    display: flex;
    flex-flow: column;
    height: 250px;
    font-size: 12px;
    
    button {
        width: 100px;
    }

    button:first-of-type {
        margin-top: 30px;
        margin-bottom: 10px;
    }

    label {
        margin-top: 20px;
    }
    
    i {
        color: red;
        padding: 0;
    }

    > span {
        align-self: flex-start;
        padding: 0;
        font-size: 10px;
        cursor: pointer;
        text-decoration: underline;
    }
`