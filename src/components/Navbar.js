import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "@firebase/auth";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import { useDispatch } from "react-redux";
import { setLoginFormValue, handleSignUpStyle } from '../store/beersStyles'
import { logoutUser } from "../store/beersAuth";

const Navbar = () => {

    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false)

   
    
    //Listener onAuthStateChange z Firebase/auth zwracający dane zalogowanego użytkownika gdy ten się zaloguje. Funkcja setUser zapisuje dane urzytkownika
    //do pozniejszczego wykorzystania
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    
        

    //Shows/hides small screen menu based on showMenu localValue 
    const handleBurgerMenu = () => {
        setShowMenu(prevState => 
            prevState = !prevState
            )
    }

    //Shows/hides Login/SignUp component. Value argument contains redux action that we want to dispatch. Based on changes in redux store LoginPage/SignUpPage
    //is shown or hidden
    const handleHide = (value) => {
        dispatch(value())
    }

    //Logout current user
    const logout = () => {       
        dispatch(logoutUser())
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
                    <li onClick={() => handleHide(setLoginFormValue)}>Logowanie</li>
                    <li onClick={() => handleHide(handleSignUpStyle)}><Link to='/'>Rejestracja</Link></li>     
                </MobileNav>

            </Navigation>

                <UserWelcome>
                    {user?.email && <span> Witaj {user?.email} !</span>}
                </UserWelcome>
            
            <FullNav> 
                <li><Link to='/'>Strona domowa</Link></li>
                {user && <li onClick={logout}>Wyloguj</li>}
                {!user && <li onClick={() => handleHide(setLoginFormValue)}>Zaloguj</li>}
                {!user && <li onClick={() => handleHide(handleSignUpStyle)}>Rejestracja</li>}
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



