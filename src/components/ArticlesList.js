import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { loadBeers, selectArticleGroups } from "../store/beers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ArticlesGroupList = () => {

    const dispatch = useDispatch();
    const {group} = useParams();

    //username selector.
    const user = useSelector(state => state.entities.auth.user.username)
    
    //articles group selector.
    const beers = useSelector(selectArticleGroups(group));

    //loading indicator: true when action callBegan is dispatched / false after last action is dispatched.
    const loading = useSelector(state => state.entities.beers.loading);

    //when true / false <InfoForUser> components display property is flex / none.
    const [infoShowForUser, setShowInfoForUser] = useState(false);

    //number of documents that are initially loaded from firebase
    const numberOfDocs = 3;
    
    
    //This useEffect contains loadBeers redux function that dispatches action that loads articles from the firebase databese 
    //(starts when group of articles is displayed or when user refreshes the page).
    useEffect(() => {

        const getBeers = () => {
            dispatch(loadBeers(numberOfDocs, group, true))
        }
        
        if(beers.length < 2){
            getBeers();
        }

    }, [dispatch, numberOfDocs])



    //Function that loads more articles from the firebase databese
    const loadMore = () => {

        const ignoreLastFetch = true;
        dispatch(loadBeers(beers.length + 2, group, ignoreLastFetch))

    }


    return ( 
        <ArticlesList>
            <Container>
                <ArticlesGrid>
                    {beers.map(beer => (
                        <ArticleItem key={beer.id}>
                            <h2>{beer.name}</h2>
                            {beer.author && <p>@{beer.author}</p>}
                            <span>{ 
                                `${beer.description[0]?.substring(0, 120)}...` 
                            }</span>
                            <span>{beer.date}</span>
                            <button><Link to={`/article/${beer.id}`}>Czytaj dalej...</Link></button>
                            
                        </ArticleItem>
                        ))}
                    
                        <AddArticleItem onClick={() => setShowInfoForUser(true)}>
                    
                            <Link to={user? `/create` : "#"}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </Link> 
                        </AddArticleItem>
                        
                    
                </ArticlesGrid>
                <InfoForUser infoShowForUser={infoShowForUser} onClick={() => setShowInfoForUser(false)}>
                    <h2>Zaloguj się aby dodać artykuł</h2>
                </InfoForUser>
                
            </Container>
            <button onClick={() => loadMore(prevState => prevState = prevState + 2)}>{loading? 'Ładuję' : 'Więcej'}</button>
            
        </ArticlesList>
     );
}
 
export default ArticlesGroupList;


const ArticlesList = styled.section`
    display: flex;
    flex-flow: column;
    min-height: 634px;
    > button {
        display: block;
        box-sizing: border-box;
        background-color: white;
        margin: 0 auto 50px;
        padding: 10px 20px;
        border: 2px solid black;
        cursor: pointer;
    }
`

const Container = styled.div`
    display: flex;
    margin: 40px 20px;
`

export const ArticlesGrid = styled.div`
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

export const ArticleItem = styled.article`
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