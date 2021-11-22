import { useSelector } from "react-redux";
import { ArticlesGrid, ArticleItem } from "./ArticlesList";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserBeer } from "../store/beers";
import { deleteUser } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useHistory } from "react-router";


const UserPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    // User state data
    const userCreds = useSelector(state => state.entities.auth.user);
    const uid = useSelector(state => state.entities.auth.user.uid);

    // Articles state data
    const beers = useSelector(state => state.entities.beers.list);

    // Currently logged in user state data from auth object.
    const user = auth.currentUser;


    
    // React hook useEffect dispatches actions that are supposed to get all articles that currently logged in user creeated.
    const ignoreLastFetch = true; 
    useEffect(() => {
        
        const getBeers = () => {

            // ignoreLastFetch: function that loads articles can be dispatched once every 10 minutes. Ignore this condition if ignoreLastFetch is true.
            dispatch(getUserBeer(uid, ignoreLastFetch))
        }


        // Gets user articles. Every article has uid verificatator that is given when article is created. This uid is the same as user uid that created the article
        // ,so we can use this uid as a selector to take articles that were created by the user.
        if(uid){
            getBeers(uid, ignoreLastFetch);
        }
            
    }, [uid])


    // Function that deletes user from firebase. Redux store is not needed here, as firebase/auth onAuthStateChange function in Navbar component 
    // will dispatch all necesary actions by itself.
    const handleDeleteAccount = () => {

        // firebase/auth function used to delete account.
        deleteUser(user).then(() => {
            // User deleted.
            history.push('/swiat')
            alert('konto usunięte')
          }).catch((error) => {
            console.log(error)
          }); 
    }

    return ( 
        <UserInfo>
            <h2>Panel użytkownika</h2>
            <article>
                <UserDets>
                    {/* User details values */}
                    <p>Użytkownik: {userCreds?.username}</p>
                    <p>Email: {userCreds?.email}</p>
                    <p>Status weryfikacji: {user?.emailVerified? <span>zweryfikowano</span> : <span>niezweryfikowano</span>}</p>
                    {/* If user is not verified show button send werification link again. Not completed yet... */}
                    {!user?.emailVerified && <button>Wyślij link weryfikacyjny</button>}
                    <button onClick={handleDeleteAccount}>Usuń konto</button>
                </UserDets>
                <h2>Twoje artykuły</h2>
                <ArticlesGrid>
                    {/* User articles are mapped here*/}
                    {beers.map(beer => (
                        <ArticleItem key={beer.id}>
                            <h2>{beer.name}</h2>
                            {beer.author && <p>@{beer.author}</p>}
                            <span>{ 
                                `${beer.description[0].substring(0, 120)}`
                            }</span>
                            <span>{beer.date}</span>
                            <button><Link to={`/article/${beer.id}`}>Czytaj dalej...</Link></button>
                        </ArticleItem>
                        ))}
                </ArticlesGrid>
            </article>
        </UserInfo>

     );
}
 
export default UserPage;


const UserInfo = styled.section`
margin: 40px;

    > h2 {
        width: 1000px;
        margin: 20px auto;
        font-size: 29px;
    }

    > article {
        width: 1000px;
        margin: 0 auto;
    }

    > article > h2 {
        margin: 45px 0 20px;
        @media (min-width: 992px) {
            margin: 54px 0 0px;
        }
    }
`
const UserDets = styled.div`
    display: flex;
    flex-flow: column;
    width: 90%;
    gap: 15px;
    @media (min-width: 768px) {
        width: 60%;
    }

    button {
        width: 150px;
        border: 2px solid black;
        background-color: transparent;
        cursor: pointer;
    }
`

