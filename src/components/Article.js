import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useParams } from "react-router";
import { deleteBeer, getOneBeer, loadBeers, selectArticle } from "../store/beers";
import styled from "styled-components";
import { setEditMode } from "../store/beersStyles";
import BeerCounter from "./BeerCounter";
import CommentsSection from "./CommentsSection";

const Article = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const userC = useSelector(state => state.entities.styles.loggedIn)
    const edit = useSelector(state => state.entities.styles.edit)

    //Selektor danych w Redux o danym id, stanowiacych treść artykułu (jeśli nie odświeżono strony)
    const beerArticleRedux = useSelector(selectArticle(id));

    //Selektor danych w Redux pobierający obecnie zaladowany artykul jezeli odswiezymy stronę
    const beerArticleOne = useSelector(state => state.entities.beers.list)

    const beerArticle = beerArticleRedux[0]? beerArticleRedux[0] : beerArticleOne[0];



    useEffect(() => {
       
        //Dispatchuje getOneBeer() który odpala middleware pobierajacy dane na temat artykułu o danym ID (jezeli odswiezylismy stronę)
        dispatch(getOneBeer(id))
        console.log('article component')
        //Unmounts useEffect when component is closed...
        return () => console.log('unmounting...');
        
    }, [id])

    //usuwa artykuł, wraca do wczesniejszej strony
    const deleteBeerArticle = (id) => {

        const ignoreLastFetch = true;
        dispatch(deleteBeer(id));
        history.goBack();
    }

    


    //ustawia wartoś edit w store na true/false. Wartośc ta steruje wyświetlaniem artykułu lub sekcji edytowania artykułu.
    const updateShowInput = () => {
        dispatch(setEditMode(false))
    }

    //wraca do poprzedniej strony
    const goBackward = () => {
        history.goBack();
    }


    return ( 
        <article>
            <ArticleShowController showContent={edit}>
                <ArticleMainContent>

                    <div>
                        <img src={beerArticle?.photo? beerArticle.photo : null}/>
                        <p>1. Lorem Ipsum dolor sie emet.</p>
                    </div>

                    <BeerCounter/>

                    <h1>{beerArticle?.name} Lorem Ipsum</h1>
                
                    <span>{beerArticle?.author? beerArticle.author : '@anonim'}</span><span>{beerArticle?.date}</span><span>{beerArticle?.color}</span>
                    <p>{beerArticle?.description}{beerArticle?.description}</p>
                    <p>{beerArticle?.description}{beerArticle?.description}</p>
                    <p>{beerArticle?.description}{beerArticle?.description}</p>
                    

                </ArticleMainContent>

                <Bibliography>

                        <h2>Bibliografia</h2>
                        <ol>
                            <li> "Punkva subterranean stream". Ramsar Sites Information Service. Retrieved 25 April 2018.</li>
                            <li> Jaskinie Punkvy. Zarząd jaskiń Republiki Czeskiej. [dostęp 2017-08-13].</li>
                        </ol>

                </Bibliography>

                

                <ArticleButtons>
                
                    {userC && <button onClick={() => deleteBeerArticle(id)}>Usuń</button>}
                    {userC && <button onClick={() => updateShowInput()}>Edytuj</button>}
                            <button onClick={() => goBackward()}>Wróć</button>
                
                </ArticleButtons>

                <CommentsSection />
            </ArticleShowController>
            
        </article>
     );
}
 
export default Article;



const ArticleShowController = styled.div`
    display: ${({showContent}) => showContent? 'block' : 'none'}
`


const ArticleButtons = styled.div`
    display: block;
    margin: 40px 0;

    button {
        margin: 5px 20px 0 0;
        width: 33%;
        background-color: transparent;
        border: 2px solid black;
        @media(min-width: 768px){
            width: 130px;
        }
    }
`

const ArticleMainContent = styled.div`
    display: flex;
    flex-flow: column;
    margin-top: 30px;
    @media(min-width: 768px) {
        display: block;
    }
    > div {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        align-self: flex-start;
        margin: 20px 0px 0px 0;
        padding-bottom: 3px;
        order: 4;
        @media(min-width: 768px){
            display: block;
            float: left;
            align-items: flex-start;
            margin-top: 0;
            margin-right: 30px;
        }
        img {
            max-width: 100%;
            width: 350px;
        }
        
        > p {
            text-indent: 0px;
            margin: 0;
            font-size: 12px;
        }
    
    }

    h1 {
        order: 1;
        font-size: 30px;
        margin: 0 0 15px 0;
        line-height: 30px;
        @media(min-width: 768px){
            font-size: 36px;
        }
    }

    > p {
        order: 4;
        text-align: justify;
        margin-top: 15px;
        font-size: 15px;
        text-indent: 40px;
    }

    span {
        margin: 0 10px 0 0;
        font-size: 11px;
        order: 2;
    }

    &:nth-child(6) {
        order: 6;
    }


`



const Bibliography = styled.div`
    display: block;
    h2 {
        font-size: 20px;
        margin: 20px 0;
    }
    ol {
        padding-left: 5;
    }
`