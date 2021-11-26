import styled from "styled-components";
import { useState } from "react";
import { sendPasswordResetEmail } from "@firebase/auth";
import { auth } from "../firebase/firebase.config";
import { setPasswordForgotForm } from '../store/beersStyles'
import { useDispatch, useSelector } from "react-redux";


// Reset password component
const ResetPassword = () => {


    const dispatch = useDispatch();

    // If true show ResetPassword component/hide LoginForm component.
    const passwordForgot = useSelector(state => state.entities.styles.passwordForgot);

    //Email local state
    const [email, setEmail] = useState();


    //Reset password
    const resetPassword = async (e, email) => {
        e.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
           
        }
        catch(error){
            console.log(error.message)
        }

        setEmail('')
        alert('Na podany email wysłano link do zmiany hasła');
        

        dispatch(setPasswordForgotForm(false))
    } 


    const hideForgotPassword = () => {
        dispatch(setPasswordForgotForm(false))
    }

    
    return ( 
        <ResetForm passwordForgot={passwordForgot}>
            <h2>Resetowanie hasła</h2>
            <ResetContainer onSubmit={(e) => resetPassword(e, email)}>
                
                <label>Twój email:</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button>Resetuj</button>
                
            </ResetContainer>
            <button onClick={hideForgotPassword}>Wróć</button>
        </ResetForm>
     );
}
 
export default ResetPassword;



const ResetForm = styled.div`
    display: ${({passwordForgot}) => passwordForgot? 'block' : 'none'};

    p {
        position: absolute;
        cursor: pointer;
        top: 5px;
        right: 10px;
    }


    button {
        width: 100px;
        margin-top: -10px;
    }
    
`

const ResetContainer = styled.form`
    display: flex;
    flex-flow: column;

    label {
        margin-top: 15px;
        font-size: 12px;
    }

    button {
        width: 100px;
        margin: 25px 0 15px;
    }
`