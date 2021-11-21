import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useParams } from "react-router";
import { deleteBeer, getOneBeer, selectArticle } from "../store/beers";
import styled from "styled-components";
import { setEditMode, setUserAgeVerified } from "../store/beersStyles";
import BeerCounter from "./BeerCounter";
import CommentsSection from "./CommentsSection";

const Article = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.entities.auth.user.username)
    const edit = useSelector(state => state.entities.styles.edit)

    //Selektor danych w Redux o danym id, stanowiacych treść artykułu (jeśli nie odświeżono strony)
    const beerArticleRedux = useSelector(selectArticle(id));


    //Selektor danych w Redux pobierający obecnie zaladowany artykul jezeli odswiezymy stronę
    const beerArticleOne = useSelector(state => state.entities.beers.list)

    const beerArticle = beerArticleRedux[0]? beerArticleRedux[0] : beerArticleOne[0];
    // console.log(Object.values(beerArticle?.description))

    
    useEffect(() => {
        const ignoreLastFetch = true;
        dispatch(getOneBeer(id, ignoreLastFetch))
        dispatch(setEditMode(false))
        dispatch(setUserAgeVerified(true))
        
        return () => console.log('unmounting...');
    },[id, dispatch])

    //usuwa artykuł, wraca do wczesniejszej strony
    const deleteBeerArticle = (id) => {

        dispatch(deleteBeer(id));
        history.goBack();
    }

    
  

    //ustawia wartoś edit w store na true/false. Wartośc ta steruje wyświetlaniem artykułu lub sekcji edytowania artykułu.
    const updateShowInput = () => {
        
            dispatch(setEditMode(true))
            
    }

    //wraca do poprzedniej strony
    const goBackward = () => {
        history.goBack();
    }


    return ( 
        <article>
            <ArticleShowController showContent={!edit}>
                <ArticleMainContent>

                    <div>
                        {beerArticle?.photo && 
                        <div>
                            <img src={beerArticle?.photo? beerArticle.photo : null} alt='zdjecie artykulu'/>
                            <p>1. Lorem Ipsum dolor sie emet.</p>
                        </div>
                    }
                        
                    </div>

                    <h1>{beerArticle?.name}</h1>
                    <BeerCounter/>
                    <ArticleDets>
                        <span>Autor: {beerArticle?.author? beerArticle.author : '@anonim '} /</span>
                        <span>/ Data publikacji: {beerArticle?.date}</span>
                    </ArticleDets>
                    {beerArticle?.description.map((descript, index) => (
                        <p key={index}>
                            {descript}
                        </p>
                    ))}
                    
                    
                </ArticleMainContent>

                <Bibliography>

                        <h2>Bibliografia</h2>
                        <ol>
                            <li> "Punkva subterranean stream". Ramsar Sites Information Service. Retrieved 25 April 2018.</li>
                            <li> Jaskinie Punkvy. Zarząd jaskiń Republiki Czeskiej. [dostęp 2017-08-13].</li>
                        </ol>

                </Bibliography>

                

                <ArticleButtons>
                    
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


