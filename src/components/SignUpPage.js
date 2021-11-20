import { useState } from "react";
import styled from "styled-components";
import { signUpUser } from "../store/beersAuth";
import { useDispatch, useSelector } from "react-redux";
import { handleSignUpStyle, setEmailVerificationMessage } from "../store/beersStyles";

const SignUpPage = () => {

    const dispatch = useDispatch();
    const setSignUpShow = useSelector(state => state.entities.styles.signUpShow);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [username, setUsername] = useState('')


    const [accept, setAccept] = useState(false)


    //Funkcja zamykająca formularz rejestracji. Zeruje wszystkie stany w formularzu 
    const handleHide = () => {
        dispatch(handleSignUpStyle()) 
        setEmail('');
        setPassword('');
        setUsername('');
        setPasswordRepeat('')
    }
       

 
    const signUp = (email, password) => {

        if(accept){
        if(password === passwordRepeat){
            dispatch(signUpUser(email, password, username));
            dispatch(handleSignUpStyle());
        
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
                        <input type='checkbox' onChange={() => setAccept(prevState => prevState = !prevState)}/>
                        <label>Akceptuję regulamin</label>
                    </div>
                    <button onClick={() => signUp(email, password)}>Zarejestruj</button>    
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
    z-index: 9999;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100vh;

    > div {
       
        margin-top: 30px;

        
    }

    button {
            margin-top: 30px; 
        }
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
    height: 300px;
    
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
        justify-content: center;
        align-items: center;
        margin-top: 20px;

        > label {
            margin-top: 0;
            margin-left: 5px;
        }
    }

    
    
`

const Codex = styled.section`
    margin: 0;
    padding-left: 5px;
    width: 50%;
    text-align: justify;
    font-size: 12px;
    ol{
        padding-left: 15px;
    }
`

