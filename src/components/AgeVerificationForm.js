import { useDispatch, useSelector } from "react-redux";
import { setUserAgeVerified } from '../store/beersStyles'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";


const AgeVerificationForm = ({ageVerified}) => {


    const dispatch = useDispatch();
    const userAgeReduxCheck = useSelector(state => state.entities.styles.ageConfirmed);

    //UserAgeCheck stores boolean value true/false if user is adult/not adult. This value comes from localStorage(ageVerified) or ReduxStore (userAgeReduxCheck)
    const userAgeCheck = ageVerified || userAgeReduxCheck;


    const [rememberAge, setRememberAge] = useState(false)

  
    //Funkcja weryfikuje wiek użytkownika. Osoby niepelnoletnie nie maja dostepu do strony
    const ageVerificationFunction = () => {

        dispatch(setUserAgeVerified(true))

        if(rememberAge)
        localStorage.setItem('ageVerifiedBeerStory', true)
        
        
    }

    //Redirects to google.com
    const redirectToGoogle = () => {
        window.location.href = "https://google.com/"
    }


    const handleClick = () => {
        setRememberAge(prevState => 
            prevState = !prevState
            )
    }
    



    return ( 
        <AgeVerification userAgeCheck={userAgeCheck}>
                <Logo>
                    <FontAwesomeIcon icon={faBeer}/>
                    BeerStory
                </Logo>
                    <AgeMessage>
                        <h2>Dostęp do strony tylko dla osób pełnoletnich</h2>
                        <label>Czy ukończyłeś 18 lat?</label>
                        <p>
                            <button onClick={() => ageVerificationFunction()}>Tak</button>
                            <button onClick={redirectToGoogle}>Nie</button>
                        </p>
                        <RememberMyChoice>
                            <input type='checkbox' onClick={handleClick}/>
                            <span>Zapamiętaj mój wybór</span>
                        </RememberMyChoice>
                    </AgeMessage>
           </AgeVerification>
     );
}
 
export default AgeVerificationForm;



const AgeVerification = styled.section`
        display: ${({userAgeCheck}) => userAgeCheck? 'none' : 'flex'};
        height: 100vh;
        width: 100vw;
        flex-flow: column;
        position: fixed;
        top: 0px;
        align-items: center;
        justify-content: center;
        background-color: white;
        z-index: 999;
        
    `

const Logo = styled.div`

    color: black;
    padding: 20px;
    font-size: 26px;
    text-align: center;
    svg {
        margin-right: 5px;
    }
`

const AgeMessage = styled.article`
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 0 20px;
    text-align: center;

    h2{
        font-size: 25px;
    }

    label {
        margin: 10px;
    }

    button {
        margin: 10px;
        background-color: white;
        border: 2px solid black;
        font-size: 20px;
        &:hover{
            background-color: #999999;
        }
    }

    
`

const RememberMyChoice = styled.div`
    display: flex;
    align-items: center;
    margin: 20px;
    font-size: 14px;

    span {
        margin-left: 10px;
        
    }
    
`