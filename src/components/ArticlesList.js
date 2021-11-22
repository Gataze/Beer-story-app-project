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
        
        if(beers.length < 3){
            getBeers();
        }

    },[dispatch, numberOfDocs])



    //Function that loads more articles from the firebase databese
    const loadMore = () => {

        const ignoreLastFetch = true;
        dispatch(loadBeers(beers.length + 2, group, ignoreLastFetch))

    }


    return ( 
        <ArticlesList>
            <Container>
                <ArticlesGrid>
                    {/* Map loaded articles data and display it*/}
                    {beers.map(beer => (
                        <ArticleItem key={beer.id}>
                            <h2>{beer.name}</h2>
                            {beer.author && <p>@{beer.author}</p>}
                            <span>{ 
                                // display only first 120 characters od descritpion
                                `${beer.description[0]?.substring(0, 120)}...` 
                            }</span>
                            <span>{beer.date}</span>
                            <button><Link to={`/article/${beer.id}`}>Czytaj dalej...</Link></button>
                            
                        </ArticleItem>
                        ))}

                        {/* If user is not logged in setShowInfoForUser as oposite value (true) */}
                        <AddArticleItem onClick={() => setShowInfoForUser(prevState => prevState = !prevState)}>
                    
                            <Link to={user? `/create` : "#"}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </Link> 
                        </AddArticleItem>
                </ArticlesGrid>
                
                {/* If infoShowForUser is true than show InfoForUser component that displays 'Zaloguj się aby dodać artykuł' */}
                <InfoForUser infoShowForUser={infoShowForUser} onClick={() => setShowInfoForUser(prevState => prevState = !prevState)}>
                    <h2>Zaloguj się aby dodać artykuł</h2>
                </InfoForUser>
                
            </Container>
            {/* After you click this button loadMore function is executed. In result more artciles are laoded*/}
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
        margin: 0 auto 50px;
        padding: 10px 20px;
        border: 2px solid black;
        background-color: white;
        cursor: pointer;
    }
`

const Container = styled.div`
    display: flex;
    margin: 40px 20px;
`

export const ArticlesGrid = styled.div`
    display: grid;
    grid-auto-rows: 200px;
    grid-template-columns: 300px;
    margin: 0 auto;
    gap: 20px;
    @media (min-width: 768px) {
        grid-template-columns: 300px 300px;
    }
    @media (min-width: 992px) {
        grid-template-columns: 300px 300px 300px;
        gap:40px;
        padding: 50px 0;
    }
`

export const ArticleItem = styled.article`
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    padding: 20px;
    border: 2px solid black;
    font-size: 10px;

    span {
        margin-top: 3px;
        text-align: justify;
    }

    button {
        margin-top: 10px;
        border: 1px solid black;
        background-color: transparent;
        font-size: 10px;
        cursor: pointer;
    }
`

const AddArticleItem = styled.div`
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: dashed;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        margin: 0;
        color: black;
        font-size: 56px;

        &:hover {
        opacity: 0.75;
        }
    }
`



const InfoForUser = styled.article`
    display: ${({infoShowForUser}) => infoShowForUser? 'flex' : 'none'};
    position: fixed;
    z-index: 999;
    top: 0px;
    left: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh);
    padding: 20px;
    background-color: rgba(46, 49, 49, 0.9);
    color: white;
    text-align: center;
    @media (min-width: 992px) {
        font-size: 25px;
    }

    h2 {
        width: 240px;
    }
   
`