import { useDispatch, useSelector } from "react-redux";
import { setUserAgeVerified } from '../store/beersStyles'
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";


// AgeVerificationForm is a component that is shown when user enters BeerStory website for the first time. Logic of this component checks if user is adult. BeerStory content is
// forbidden for non adult users. ReduxStore and LocalStorage are used to store the value that confirms user is 18+ y.o.
const AgeVerificationForm = ({ageVerified}) => {


    const dispatch = useDispatch();
    const userAgeReduxCheck = useSelector(state => state.entities.styles.ageConfirmed);

    //UserAgeCheck stores boolean value true/false if user is adult/not adult. This value comes from localStorage(ageVerified) or ReduxStore (userAgeReduxCheck)
    const userAgeCheck = ageVerified || userAgeReduxCheck;

    //RememberAge stores local value true/false if user is adult/not adult.
    const [rememberAge, setRememberAge] = useState(false)

    //AgeVerificationFunction sets ageConfirmed valuein ReduxStore as true and saves rememberAge localState to localStorage if(rememberAge === true);
    const ageVerificationFunction = () => {

        dispatch(setUserAgeVerified(true))

        if(rememberAge)
        localStorage.setItem('ageVerifiedBeerStory', true)    
    }

    //Redirects to google.com
    const redirectToGoogle = () => {
        window.location.href = "https://google.com/"
    }

    //HandleClick changes rememberAge local value from false to true;
    const handleClick = () => {
        setRememberAge(prevState => 
            prevState = !prevState
            )
    }
    



    return ( 
        // If userAgeCheck is true set AgeVerification display as none
        <AgeVerification userAgeCheck={userAgeCheck}>
                <Logo>
                    <FontAwesomeIcon icon={faBeer}/>
                    BeerStory
                </Logo>
                    <AgeMessage>
                        <h2>Dostęp do strony tylko dla osób pełnoletnich</h2>
                        <label>Czy ukończyłeś 18 lat?</label>
                        <p>
                            {/* If user clicks buttton 'Tak' app knows that user has 18+ years */}
                            <button onClick={() => ageVerificationFunction()}>Tak</button>
                            {/* If user clicks button 'Nie' it means user is less than 18 y.o. (redirectToGoogle) => Redirecs to google*/}
                            <button onClick={redirectToGoogle}>Nie</button>
                        </p>
                        <RememberMyChoice>
                            {/* //If user checks the input app remembers that user has 18+ years old */}
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
        position: fixed;
        z-index: 999;
        top: 0px;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background-color: white;
        
    `

const Logo = styled.div`
    padding: 20px;
    color: black;
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

    h2 {
        font-size: 25px;
    }

    label {
        margin: 10px;
    }

    button {
        margin: 10px;
        border: 2px solid black;
        background-color: white;
        font-size: 20px;

        &:hover {
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