import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router"
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "@firebase/auth";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import { useDispatch, useSelector } from "react-redux";
import { setLoginFormValue, handleSignUpStyle, setUserAgeVerified, setEmailVerificationMessage } from '../store/beersStyles'
import { logoutUser, setUserLoggedIn  } from "../store/beersAuth";
import Loader from "./Loader";




const Navbar = () => {

    const dispatch = useDispatch();
    
    const user = useSelector(state => state.entities.auth.user.username);
    const emailVerified = useSelector(state => state.entities.styles.emailVerificationMessage);


    const [showMenu, setShowMenu] = useState(false)
    const history = useHistory()


   
    
    //Listener onAuthStateChange z Firebase/auth zwracający dane zalogowanego użytkownika gdy ten się zaloguje. Funkcja setUser zapisuje dane urzytkownika
    //do pozniejszczego wykorzystania
    // const [user, setUser] = useState({});


    
    //Komponent ma wiele zmiennych? więc renderuje się kilka razy przez co kilka razy odpalal funkcje onAuthStateChange. Umieszczenie go w useEffect
    //sprawia ze odpla sie tylko przy zaladowaniu
    useEffect( () => {

        onAuthStateChanged(auth,  (currentUser) => {

            const email =  currentUser?.email? currentUser.email : false;
            const username = currentUser?.email? currentUser.displayName : false;
            const uid = currentUser?.email? currentUser.uid : false;
            const data = {email, username, uid}

                //Po odświeżeniu strony lub zalogowaniu zamieszcza dane o uzytkowniku wredux store. Po zarejestrowaniu tez się dispatchuje jednak nie zamieszcza
                //username wlasciwego. Username tworzony jest po utworzeniu uzytkownika w bazie firebase. Utworzenie uzytkownika samo w sobie 
                //uruchamia onAuthStateChange jeszcze przed nadaniem uzytkownika przez co po rejestracji username początkowo zostaje null. 
                //Aby zamiescic nazwe uzytkonika w redux to po rejestracji funkcja ta dispatchuje sie wtedy rownież w middleware tuż po dodaniu uzytkownika do bazy firebase.
                

                dispatch(setUserLoggedIn(data))
                if(!uid) dispatch(setUserAgeVerified(false))
           
    
        })

    },[dispatch])

    

    
    
    

    //Shows/hides small screen menu based on showMenu localValue 
    const handleBurgerMenu = () => {
        setShowMenu(prevState => 
            prevState = !prevState
            )
    }

    //Shows/hides Login/SignUp component. Value argument contains redux action that we want to dispatch. Based on changes in redux store LoginPage/SignUpPage
    //is shown or hidden
    const showForm = (value) => {
        dispatch(value())
    }

    //Logout current user
    const logout = () => {       
        dispatch(logoutUser())
        history.push('/')
    }


    

    

    return ( 
        <NavbarContainer>
            
            <Navigation showMenu={showMenu}>

                <Logo>
                    <Link to='/'>
                        <FontAwesomeIcon icon={faBeer} />
                        BeerStory
                    </Link>
                </Logo>
            
            
                <Burger onClick={handleBurgerMenu}>
                    <BurgerContainer>
                        <span></span>
                        <span></span>
                        <span></span>
                    </BurgerContainer>
                </Burger>

                <MobileNav showMenu={showMenu}>
                    <li><Link to='/'>Strona domowa</Link></li>
                    {!user && <li onClick={() => showForm(setLoginFormValue)}>Zaloguj</li>}
                    {user && <li><Link to='/użytkownik/panel'>Użytkownik</Link></li>}
                    {!user && <li onClick={() => showForm(handleSignUpStyle)}>Rejestracja</li>}    
                    {user && <li onClick={logout}>Wyloguj</li>}
                </MobileNav>

            </Navigation>

                <UserWelcome>
                    {user && <span> Witaj {user} !</span>}
                </UserWelcome>
            
            <FullNav> 
                <li><Link to='/'>Strona domowa</Link></li>
                {user && <li onClick={logout}>Wyloguj</li>}
                {user && <li><Link to='/użytkownik/panel'>Użytkownik</Link></li>}
                {!user && <li onClick={() => showForm(setLoginFormValue)}>Zaloguj</li>}
                {!user && <li onClick={() => showForm(handleSignUpStyle)}>Rejestracja</li>}
                <li><Link to='/'><FontAwesomeIcon icon={faInstagram} /></Link></li>
            </FullNav>

            <LoginPage />

            <SignUpPage />
            
            <Loader />

            <VerifyEmail emailVerified={emailVerified}>
                <h2>W celu pełnej aktywacji konta na twój email wysłany został link weryfikacyjny.</h2>
                <p>Aby dostać nową wiadomość weryfikacyjną wejdz w panel użytkownika i kliknij przycisk 'Ponownie wyślij wiadomośc weryfikacyjną' </p>
                <button onClick={() => dispatch(setEmailVerificationMessage(false))}>Ok</button>
            </VerifyEmail>

        </NavbarContainer>

     );
}
 
export default Navbar;


const NavbarContainer = styled.section`
    display: flex;
    flex-flow: column;
    background-color: #233237 ;
    @media(min-width: 768px){
        flex-flow: row;
        align-items: center;
    }
    span {
        margin: 0 0 0 auto;
        color: white;
        font-size: 14px;
        @media(min-width: 992px){
            margin: 0;
            font-size: 16px;
            padding: 0 20px;
        }
    }
`


const Navigation = styled.nav`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-flow: column;
    background-color: #233237;
    color: white;
    height: ${({showMenu}) => showMenu? 'auto' : '70px'};
    @media(min-width: 768px){
        flex-flow: row;
    }
`

const Logo = styled.h2`
    padding: 20px;

    a {
        color: white;
        text-decoration: none;
    }
    svg {
        margin-right: 10px;
    }
`



const MobileNav = styled.ul`
    display: flex;
    list-style-type: none;
    padding: 20px;
    flex-flow: column;
    text-align: center;
    z-index: 0;
    transform: ${({showMenu}) => showMenu? 'translateY(0%)' : 'translateY(-120%)'};
    @media(min-width: 768px){
        display: none;
    }
    li {
        font-size: 20px;
        margin: 20px;
        cursor: pointer;
        a {
            color: white;
            text-decoration: none;
            font-size: 20px;
        }
    }
`

const FullNav = styled.ul`
    display: none;
    @media(min-width: 768px){
        display: flex;
        list-style-type: none;
        gap: 30px;
        align-items: center;
        margin-left: auto;
        margin-right: 20px;
    a {
        color: white;
        text-decoration: none;
        }
    }
    li {
        cursor: pointer;
        color: white;
    }
`

const UserWelcome = styled.div`
    display: none;
    margin: 0 auto 0 20px;
    @media(min-width: 992px){
        display: flex;
    }
    
`

const Burger = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    background: transparent;
    width: 30px;
    height: 30px;
    z-index: 100;
    @media(min-width: 768px){
        display: none;
    }
`

const BurgerContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    height: 100%;

    span {
        background-color: white;
        height: 4px;
        width: 100%;
        border-radius: 2px;
    }
`



const VerifyEmail = styled.div`
    display: ${({emailVerified}) => emailVerified? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    flex-flow: column;
    position: fixed;
    top: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.9);
    z-index: 9999;
    color: white;
    gap: 20px;
    text-align: center;

    h2{
        width: 70%;
        font-weight: 600;
        
    }

    p {
        width: 70%;
        font-size: 12px;
    }
`