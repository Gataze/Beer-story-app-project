import { useSelector } from "react-redux";
import { ArticlesGrid, ArticleItem } from "./WorldBeerHistory";
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
                <div>
                    <p>Użytkownik: {userCreds?.username}</p>
                    <p>Email: {userCreds?.email}</p>
                    <button onClick={handleDeleteAccount}>Usuń konto</button>
                </div>
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
                {/* <button onClick={() => loadMore(prevState => prevState = prevState + 2)}>{loading? 'Ładuję' : 'Więcej'}</button> */}
            </article>
        </UserInfo>

     );
}
 
export default UserPage;


const UserInfo = styled.section`
margin: 40px;
    > h2{
        font-size: 29px;
        margin-bottom: 20px;
    }

    > article > h2{
        margin-top: 25px;
    }

    > article > button {
        display: block;
        background-color: white;
        border: 2px solid black;
        padding: 5px;
        margin: 0 auto;
    }
`


