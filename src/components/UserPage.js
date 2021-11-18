import { useSelector } from "react-redux";
import { ArticlesGrid, ArticleItem } from "./WorldBeerHistory";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserBeer } from "../store/beers";

const UserPage = () => {

    const userCreds = useSelector(state => state.entities.auth.user)

    const dispatch = useDispatch();
    
    const beers = useSelector(state => state.entities.beers.list);
    // const loading = useSelector(state => state.entities.beers.loading);
    const uid = useSelector(state => state.entities.auth.user.uid)

    
    const ignoreLastFetch = true

    useEffect(() => {
        
    
        const getBeers = () => {
            dispatch(getUserBeer(uid, ignoreLastFetch))
        }

        if(uid){
            getBeers(uid, ignoreLastFetch);
        }
            
           
    }, [uid])



    return ( 
        <UserInfo>
            <h2>Panel użytkownika</h2>
            <article>
                <div>
                    <p>Użytkownik: {userCreds?.username}</p>
                    <p>Email: {userCreds?.email}</p>
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


