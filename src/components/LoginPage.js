import { useState } from "react";
import styled from "styled-components";
import { loginUser } from "../store/beersAuth";
import { useDispatch, useSelector } from "react-redux";
import { setLoginFormValue } from "../store/beersStyles";

const LoginPage = () => {

    const dispatch = useDispatch();


    //ustala czy formularz logowania się wyświetla czy nie
    const setLoginShow = useSelector(state => state.entities.styles.loginShow);


    //zmienne zapuisujące email i haslo wpisane w formularzu
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //ukrywa formularz logowania
    const hideForm = () => {
        dispatch(setLoginFormValue()) 
    }
       

    //loguje urzytkownika, ukrywa formularz logowania
    const login = (email, password) => {
        
        dispatch(loginUser(email, password))
        dispatch(setLoginFormValue()) 
        setEmail('')
        setPassword('')

    }


    return ( 
        <LoginPageContainer setLoginShow={setLoginShow}>
            <LoginForm>
            <p onClick={hideForm}>X</p>
            <h2>Logowanie do BeerStory</h2>
                <Form>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Hasło: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button onClick={() => login(email, password)}>Zaloguj</button>
                    <button>Przypomnij</button>
                </Form>
            </LoginForm>
        </LoginPageContainer>
        
     );
}
 
export default LoginPage;


const LoginPageContainer = styled.div`
    display: ${({setLoginShow}) =>  setLoginShow? 'flex' : 'none' };
    box-sizing: border-box;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(46, 49, 49, 0.9);
    color: white;
    padding: 20px;
    z-index: 999;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100vh
`


const LoginForm = styled.section`
    width: 300px;
    p{ 
        display: flex;
        position: absolute;
        justify-content: flex-end;
        right: 10px;
        top: 5px;
        cursor: pointer;
        
    }
    
`


const Form = styled.div`
    display: flex;
    flex-flow: column;
    font-size: 12px;
    height: 250px;
    
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
    
`