import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useParams } from "react-router";
import { deleteBeer, getOneBeer, selectArticle, clearBeer } from "../store/beers";
import styled from "styled-components";
import { setEditMode, setUserAgeVerified } from "../store/beersStyles";
import BeerCounter from "./BeerCounter";
import CommentsSection from "./CommentsSection";


//Component used to display article that user wants to show (from ArtcileList). Component has display: none when user clicks 'edytuj' button.
const Article = () => {


    //Id is used to selectively gets/deletes the article data from Firebase and ReduxStore.  
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    //Gets user username from Redux store.
    const user = useSelector(state => state.entities.auth.user.username)

    //Gets edit value from Redux store.
    const edit = useSelector(state => state.entities.styles.edit)

    //React-redux Selector of the article with given id.
    const beerArticleRedux = useSelector(selectArticle(id));
    const beerArticle = beerArticleRedux[0];

    //React useEffect hook is used to dispatch actions that are responsible for getting artcile data(artcile title, description, rates, comments etc.) from Firestore database. 
    useEffect(() => {
        const ignoreLastFetch = true;
        dispatch(getOneBeer(id, ignoreLastFetch))
        dispatch(setEditMode(false))
        dispatch(setUserAgeVerified(true))
        
        return () => console.log('unmounting...');
    },[id, dispatch])

    //Function deleteBeerArticle deletes currently loaded artcile.
    const deleteBeerArticle = (id) => {
        dispatch(deleteBeer(id));
        dispatch(clearBeer())
        history.goBack();
    }

    
    //Sets edit mode value in redux store as true. If true edit mode is on.
    const updateShowInput = () => {
        dispatch(setEditMode(true))    
    }

    //Goes back to previous page
    const goBackward = () => {
        history.goBack();
    }

    // beerArticle?.photo? beerArticle.photo : null

    return ( 
        <article>

            {/* If edit value is false set ArticleShowController display as none  */}
            <ArticleShowController showContent={!edit}>
                <ArticleMainContent>

                    <div>
                        {/* If beerArticle.photo is loaded show beerArticle.photo*/}
                        {beerArticle?.photo && 
                        <div>
                            <img src={beerArticle.photo} alt='zdjecie artykulu'/>
                            <p>1. Lorem Ipsum dolor sie emet.</p>
                        </div>
                    }
                        
                    </div>
                    {/* If beerArticle has name show beerArticle.name.*/}
                    <h1>{beerArticle?.name}</h1>

                    {/* Component responsible for showing current article ratings. */}
                    <BeerCounter/>

                    {/* If beerArtcile has author and creation data load author and creation data. */}
                    <ArticleDets>
                        <span>Autor: {beerArticle?.author? beerArticle.author : '@anonim '}</span>
                        <span>Data publikacji: {beerArticle?.date}</span>
                    </ArticleDets>
                    {/* Maps beerArtcile description paragraphs on page.*/}
                    {beerArticle?.description.map((descript, index) => (
                        <p key={index}>
                            {descript}
                        </p>
                    ))}
                    
                </ArticleMainContent>

                {/* Hardcoded bibliography section currently not finished (22.11.2021) */}
                <Bibliography>

                        <h2>Bibliografia</h2>
                        <ol>
                            <li> "Punkva subterranean stream". Ramsar Sites Information Service. Retrieved 25 April 2018.</li>
                            <li> Jaskinie Punkvy. Zarząd jaskiń Republiki Czeskiej. [dostęp 2017-08-13].</li>
                        </ol>

                </Bibliography>

                <ArticleButtons>
                    
                    {/* If user is logged in user value is true. If user value is true delete and edit buttons are visible. */}
                    {user && user ===  beerArticle?.author && <button onClick={() => deleteBeerArticle(id)}>Usuń</button>}
                    {user && user ===  beerArticle?.author && <button onClick={() => updateShowInput()}>Edytuj</button>}
                            <button onClick={() => goBackward()}>Wróć</button>
                
                </ArticleButtons>

                <CommentsSection />
            </ArticleShowController>
           
        </article>
     );
}
 
export default Article;



const ArticleShowController = styled.div`
    display: ${({showContent}) => showContent? 'block' : 'none'};
    position: relative;
`


const ArticleButtons = styled.div`
    display: block;
    margin: 40px 0;

    button {
        width: 33%;
        margin: 5px 20px 0 0;
        border: 2px solid black;
        background-color: transparent;
        @media (min-width: 768px) {
            width: 130px;
        }
    }
`

const ArticleMainContent = styled.div`
    display: flex;
    flex-flow: column;
    margin-top: 30px;
    @media (min-width: 768px) {
        display: block;
    }

    > p {
        order: 4;
        margin-top: 25px;
        font-size: 15px;
        text-align: justify;
        text-indent: 40px;
    }

    > div {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        align-self: flex-start;
        
        order: 4;
        margin: 20px 0px 0px 0;
        @media (min-width: 768px) {
            display: block;
            align-items: flex-start;
            margin-top: 0;
            margin-right: 30px;
            float: left;
        }

        img {
            width: 350px;
            max-width: 100%;
        }
        
        > p {
            margin: 0;
            font-size: 12px;
            text-indent: 0px;
            
        }
    
    }

    h1 {
        order: 1;
        margin: 0 0 15px;
        font-size: 30px;
        line-height: 30px;
        @media (min-width: 768px) {
            font-size: 36px;
        }
    }

    

    > span {
        order: 2;
        margin: 0 5px 0 0;
        font-size: 11px;
        line-height: 5px;
    }

    &:nth-child(6) {
        order: 6;
    }

`

//Stylizuje element zawierający nazwę autora i datę
const ArticleDets = styled.summary`
    display: flex;
    justify-content: flex-end;
    flex-flow: column;
    
    @media(min-width: 768px){
        flex-flow: row;
        gap: 10px;
    }
    

`



const Bibliography = styled.div`
    display: block;

    h2 {
        margin: 20px 0;
        font-size: 20px;
    }

    ol {
        padding-left: 5;
    }
`


