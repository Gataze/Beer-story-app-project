import { useState } from "react";
import styled from "styled-components";
import { signUpUser } from "../store/beersAuth";
import { useDispatch, useSelector } from "react-redux";
import { handleSignUpStyle, setEmailVerificationMessage } from "../store/beersStyles";


// User sign-up component.
const SignUpPage = () => {

    const dispatch = useDispatch();

    // If true user sign-up form is shown.
    const setSignUpShow = useSelector(state => state.entities.styles.signUpShow);

    // Local states for values from inputs of sing-up form.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [username, setUsername] = useState('')

    // Accept value. Has to be true if user wants to sign-up.
    const [accept, setAccept] = useState(false)


    //Function handleHide closes sign-up form and resets input values.
    const handleHide = () => {
        dispatch(handleSignUpStyle()) 
        setEmail('');
        setPassword('');
        setUsername('');
        setPasswordRepeat('')
    }
       

    // If accept value is true and passwords are identical execute signUpUser function.
    const signUp = (email, password) => {

        if(accept){
        if(password === passwordRepeat){
            dispatch(signUpUser(email, password, username));

            // Close sign-up form.
            dispatch(handleSignUpStyle());
        
            // Resets input values.
            setEmail('');
            setPassword('');
            setUsername('');
            setPasswordRepeat('');

            dispatch(setEmailVerificationMessage(true));

        } else {
            alert('Wpisane hasła nie są identyczne')
        }
    }else{
        alert('regulamin niezaakceptowany')
    }      
}


    return ( 
        <LoginPageContainer setSignUpShow={setSignUpShow}>
            <LoginForm>
            {/* Sign-up form close button. */}
            <p onClick={() => handleHide(handleSignUpStyle)}>X</p>
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
                </Form>
            </LoginForm> 
                    <Codex>Regulamin:
                        <ol>
                            <li>Wszelkie dane zamieszczone przez użytkownika w testowej wersji aplikacji BeerStory mogą zostać usunięte bez podania przyczyny.</li>
                            <li>Użytkownik nie będzie zamieszczał na stronie żadnych danych osobowych, danych wrażliwych, materiałów do których nie ma praw autorskich i wszelkich innych treści niezgodnych z prawem obowiązującym w Rzeczpospolitej Polsce.</li>
                            <li>Użytkownik może dowolnie testować niniejszą stronę. W razie znalezienia problemów użytkownik proszony jest o kontak mailowy z właścicielem strony: b.gataze@gmail.com</li>
                        </ol>
                    </Codex>
                    <div>
                        {/* Accept terms checkbox. Has to be checked if user wants to create a new account. */}
                        <input type='checkbox' onChange={() => setAccept(prevState => prevState = !prevState)}/>
                        <label>Akceptuję regulamin</label>
                    </div>
                    {/* Sign-up button. */}
                    <button onClick={() => signUp(email, password)}>Zarejestruj</button>    
        </LoginPageContainer>
        
     );
}
 
export default SignUpPage;


const LoginPageContainer = styled.div`
    display: ${({setSignUpShow}) =>  setSignUpShow? 'flex' : 'none' };
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

    > div {
       
        margin-top: 30px;
        
    }

    button {
            margin-top: 30px;
        }
`

const LoginForm = styled.section`
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

const Form = styled.div`
    display: flex;
    flex-flow: column;
    height: 300px;
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

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;

        > label {
            margin-top: 0;
            margin-left: 5px;
        }
    } 
`

const Codex = styled.section`
    width: 50%;
    margin: 0;
    padding-left: 5px;
    font-size: 12px;
    text-align: justify;

    ol {
        padding-left: 15px;
    }
`

