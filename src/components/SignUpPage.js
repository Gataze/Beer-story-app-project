import { useState } from "react";
import styled from "styled-components";
import { signUpUser } from "../store/beersAuth";
import { useDispatch, useSelector } from "react-redux";
import { handleSignUpStyle } from "../store/beersStyles";

const SignUpPage = () => {

    const dispatch = useDispatch();
    const setSignUpShow = useSelector(state => state.entities.styles.signUpShow);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [username, setUsername] = useState('')


    //Funkcja zamykająca formularz rejestracji. Zeruje wszystkie stany w formularzu 
    const handleHide = () => {
        dispatch(handleSignUpStyle()) 
        setEmail('');
        setPassword('');
        setUsername('');
        setPasswordRepeat('')
    }
       

 
    const signUp = (email, password) => {

        if(password === passwordRepeat){
            dispatch(signUpUser(email, password, username));
            dispatch(handleSignUpStyle());
        
            setEmail('');
            setPassword('');
            setUsername('');
            setPasswordRepeat('')

        } else {
            alert('Wpisane hasła nie są identyczne')
        }
        
        
    }


    return ( 
        <LoginPageContainer setSignUpShow={setSignUpShow}>
            <LoginForm>
            <p  onClick={() => handleHide(handleSignUpStyle)}>X</p>
            <h2>Rejestracja do BeerStory</h2>
                <Form>
                    <label>Użytkownik: </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label>Hasło: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label>Powtórz hasło: </label>
                    <input type="password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)}/>
                    <button onClick={() => signUp(email, password)}>Zarejestruj</button>
                </Form>
            </LoginForm>
        </LoginPageContainer>
        
     );
}
 
export default SignUpPage;


const LoginPageContainer = styled.div`
    display: ${({setSignUpShow}) =>  setSignUpShow? 'flex' : 'none' };
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