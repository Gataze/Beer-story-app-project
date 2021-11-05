import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { loadBeers } from "../store/beers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const WorldBeerHistory = () => {

    const dispatch = useDispatch();
    const loginStatus = useSelector(state => state.entities.styles.loggedIn);
    const beers = useSelector(state => state.entities.beers.list);
    const loading = useSelector(state => state.entities.beers.loading);
    const [infoShowForUser, setShowInfoForUser] = useState(false);

    const [numberOfDisplayedDocs, setNumberOfDisplayedDocs] = useState(3)
    


    useEffect(() => {
        const getBeers = () => {
            dispatch(loadBeers(numberOfDisplayedDocs))
        }
        getBeers();   
    }, [dispatch, numberOfDisplayedDocs])



    return ( 
        <ArticlesList>
            <Container>
                <ArticlesGrid>
                    {beers.map(beer => (
                        <ArticleItem key={beer.id}>
                            <h2>{beer.name}</h2>
                            <p>@Kowalski</p>
                            <span>{ 
                                (beer.description.length > 20)?
                                `${beer.description.substring(0, 120)}...` : beer.description
                            }</span>
                            <span>{beer.date}</span>
                            <button><Link to={`/article/${beer.id}`}>Czytaj dalej...</Link></button>
                            
                        </ArticleItem>
                        ))}
                    
                        <AddArticleItem onClick={() => setShowInfoForUser(true)}>
                    
                            <Link to={loginStatus? '/create' : "#"}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </Link> 
                        </AddArticleItem>
                        
                    
                </ArticlesGrid>
                <InfoForUser infoShowForUser={infoShowForUser} onClick={() => setShowInfoForUser(false)}>
                    <h2>Zaloguj się aby dodać artykuł</h2>
                </InfoForUser>
                
            </Container>
            <button onClick={() => setNumberOfDisplayedDocs(prevState => prevState = prevState + 2)}>{loading? 'Ładuję' : 'Więcej'}</button>
        </ArticlesList>
     );
}
 
export default WorldBeerHistory;


const ArticlesList = styled.section`
    > button {
        display: block;
        background-color: white;
        margin: 0 auto 40px;
        padding: 10px 20px;
        border: 2px solid black;
        cursor: pointer;
    }
`



const Container = styled.div`
    display: flex;
    margin: 40px 20px;
`

const ArticlesGrid = styled.div`
    display: grid;
    grid-template-columns: 300px;
    grid-auto-rows: 200px;
    margin: 0 auto;
    gap: 20px;
    @media(min-width: 768px){
        grid-template-columns: 300px 300px;
    }
    @media(min-width: 992px){
        grid-template-columns: 300px 300px 300px;
        gap:40px;
        padding: 50px 0;
    }
`

const ArticleItem = styled.article`
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    border: 2px solid black;
    font-size: 10px;
    padding: 20px;
    span {
        text-align: justify;
        margin-top: 3px;
    }
    button {
        border: 1px solid black;
        background-color: transparent;
        font-size: 10px;
        margin-top: 10px;
        cursor: pointer;
    }
`

const AddArticleItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: dashed;
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        margin: 0;
        height: 100%;
        width: 100%;
        font-size: 56px;
        &:hover{
        opacity: 0.75;
        }
    }
`

const InfoForUser = styled.article`
    display: ${({infoShowForUser}) => infoShowForUser? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    position: fixed;
    padding: 20px;
    width: 100%;
    height: calc(100vh);
    background-color: rgba(46, 49, 49, 0.9);
    top: 0px;
    left: 0;
    z-index: 999;
    color: white;
    text-align: center;
    @media(min-width: 992px){
        font-size: 25px;
    }
    h2{
        width: 240px;
    }
   
`