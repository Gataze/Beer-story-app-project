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

    const userCreds = useSelector(state => state.entities.auth.user)

    const dispatch = useDispatch();
    
    const beers = useSelector(state => state.entities.beers.list);
  
    const uid = useSelector(state => state.entities.auth.user.uid)


    const user = auth.currentUser;


    const history = useHistory();
    
    const ignoreLastFetch = true

    useEffect(() => {
        
    
        const getBeers = () => {
            dispatch(getUserBeer(uid, ignoreLastFetch))
        }

        if(uid){
            getBeers(uid, ignoreLastFetch);
        }
            
           
    }, [uid])




    const handleDeleteAccount = () => {
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
                    <p>Użytkownik: {userCreds?.username}</p>
                    <p>Email: {userCreds?.email}</p>
                    <p>Status weryfikacji: {user?.emailVerified? <span>zweryfikowano</span> : <span>niezweryfikowano</span>}</p>
                    {!user.emailVerified && <button>Wyślij link weryfikacyjny</button>}
                    <button onClick={handleDeleteAccount}>Usuń konto</button>
                </UserDets>
                <h2>Twoje artykuły</h2>
                <ArticlesGrid>
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
    > h2{
        font-size: 29px;
        margin: 20px auto;
        width: 1000px;
    }

    > article {
        margin: 0 auto;
        width: 1000px;
    }

    > article > h2{
        margin: 45px 0 20px;
        @media(min-width: 992px){
            margin: 54px 0 0px;
        }
    }
`
const UserDets = styled.div`
    display: flex;
    flex-flow: column;
    width: 90%;
    gap: 15px;
    @media(min-width: 768px){
        width: 60%;
    }
    button {
        width: 150px;
        background-color: transparent;
        border: 2px solid black;
        cursor: pointer;
    }
`

