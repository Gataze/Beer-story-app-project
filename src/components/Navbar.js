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
import { setLoginFormValue, handleSignUpStyle, setUserLoggedIn } from '../store/beersStyles'
import { logoutUser } from "../store/beersAuth";
import { loadBeers } from "../store/beers";

const Navbar = () => {

    const dispatch = useDispatch();
    const userC = useSelector(state => state.entities.styles.loggedIn)
    const [showMenu, setShowMenu] = useState(false)
    const history = useHistory()
   
    
    //Listener onAuthStateChange z Firebase/auth zwracający dane zalogowanego użytkownika gdy ten się zaloguje. Funkcja setUser zapisuje dane urzytkownika
    //do pozniejszczego wykorzystania
    // const [user, setUser] = useState({});


    
    //Komponent ma wiele zmiennych? więc renderuje się kilka razy przez co kilka razy odpalal funkcje onAuthStateChange. Umieszczenie go w useEffect
    //sprawia ze odpla sie tylko przy zaladowaniu
    useEffect(() => {

        onAuthStateChanged(auth, (currentUser) => {

            const email = currentUser?.email? currentUser.email : false;
        
            dispatch(setUserLoggedIn(email))
            
    
        })
    },[auth])

    
        

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
                    <FontAwesomeIcon icon={faBeer} />
                    BeerStory
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
                    <li onClick={() => showForm(setLoginFormValue)}>Logowanie</li>
                    <li onClick={() => showForm(handleSignUpStyle)}><Link to='/'>Rejestracja</Link></li>     
                </MobileNav>

            </Navigation>

                <UserWelcome>
                    {userC && <span> Witaj {userC} !</span>}
                </UserWelcome>
            
            <FullNav> 
                <li><Link to='/'>Strona domowa</Link></li>
                {userC && <li onClick={logout}>Wyloguj</li>}
                {!userC && <li onClick={() => showForm(setLoginFormValue)}>Zaloguj</li>}
                {!userC && <li onClick={() => showForm(handleSignUpStyle)}>Rejestracja</li>}
                <li><Link to='/'><FontAwesomeIcon icon={faInstagram} /></Link></li>
            </FullNav>

            <LoginPage />

            <SignUpPage />
            
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



