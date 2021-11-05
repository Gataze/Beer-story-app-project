import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { deleteBeer, loadBeers, updateBeer, selectArticle } from "../store/beers";
import { loadState } from "../localStorage";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "@firebase/auth";

const Article = () => {

    
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })


    
    const [beerArticleFromLocal, setBeerArticleFromLocal] = useState('');


    //Selektor danych w Redux o danym id, stanowiacych treść artykułu
    const beerArticleReduxArray = useSelector(selectArticle(id));


    //Pobieranie danych z localStorage zapisanych wcześniej w magazynie Redux. Powód: Po odświeżeniu strony, magazyn Redux musi ponownie 
    //pobrać dane z Firestore aby je wyświetlić. W celu uniknięcia ponownego pobierania wcześniej załadowanych danych zapisano je w localStorage,
    // w celu poźniejszego wykorzystania po odswiezeniu strony.
    useEffect(() => {

        const beerArticleArray = loadState().data.list.filter(beer => beer.id === id);

        setBeerArticleFromLocal(beerArticleArray[0])
        
    }, [id])

    
    //Jeżeli magazyn Redux zaladowany jest danymi z firebase wtedy przypisuje te wartosci do beerArticle, jeżeli nie to przypisuje 
    //wartości znajdujące się w localStorage (np. po odświeżeniu strony gdy magazyn Redux jest czyszczony)
    const beerArticle = beerArticleReduxArray[0]? beerArticleReduxArray[0] : beerArticleFromLocal

    //Zmienne zawierające informacje o zmianach które będą wprowadzane do artykułu.
    const [beerName, setBeerName] = useState('');
    const [beerColor, setBeerColor] = useState('');
    const [beerDescription, setBeerDescription] = useState('');


    //Funkcja deleteBeerArticle usówa artykuł o danym id nastepnie cofa do poprzednio wyświetlanej podstrony
    const deleteBeerArticle = (id) => {

        dispatch(deleteBeer(id))
        history.goBack()
    }

    //Funckja updateBeerArticle aktualizuje zmienione wartości 'color' nastepnie pobiera zaktualizowaną wartośc z firebase.
    const updateBeerArticle = (id, name, description, color) => {

        const data = {id, description, name, color}

        dispatch(updateBeer(data))
        dispatch(loadBeers())

        setShowContent(prevState => 
            prevState = !prevState
            )

        setShowInput(prevState => 
            prevState = !prevState
            )  

    }

    


    //Zmienia styly display none/block dla danego artykułu gdy chcemy go zaktualizować/zrezygnować z aktulaizacji
    const [showInput, setShowInput] = useState(false)
    const [showContent, setShowContent] = useState(true)




    const updateShowInput = () => {
        
        setBeerName(beerArticle.name)
        setBeerDescription(beerArticle.description)
        setBeerColor(beerArticle.color)
        
        setShowContent(prevState => 
            prevState = !prevState
            )

        setShowInput(prevState => 
            prevState = !prevState
            )
        

    }
    const updateHideInput = () => {
        setShowContent(prevState => 
            prevState = !prevState
            )

        setShowInput(prevState => 
            prevState = !prevState
            )  
    }

    

    return ( 
        <section>
            <article>
                <ShowContent showContent={showContent}>
                    <InputArticleContainer>
                        <h2>Nazwa: {beerArticle.name}</h2>
                        <p>Opis: {beerArticle.description}</p>
                        <p>Kolor: {beerArticle.color}</p>
                        <p>Data publikacji: {beerArticle.date}</p>
                        {user && <button onClick={() => deleteBeerArticle(id)}>Usuń</button>}
                        {user && <button onClick={() => updateShowInput()}>Edytuj</button>}
                        <button onClick={() => history.goBack()}>Wróć</button>
                        
                    </InputArticleContainer>          
                </ShowContent>
                <InputShow showInput={showInput}>
                    <InputArticleContainer>
                        <ArticleContainer>
                            <label>Nazwa: </label>
                            <input type="text" value={beerName} onChange={(e) => setBeerName(e.target.value)} />
                            <label>Opis: </label>
                            <input type="text" value={beerDescription} onChange={(e) => setBeerDescription(e.target.value)} />
                            <label>Kolor: </label>
                            <input type="text" value={beerColor} onChange={(e) => setBeerColor(e.target.value)} />
                        </ArticleContainer>
                        <button onClick={() => updateBeerArticle(id, beerName, beerDescription, beerColor)}>Aktualizuj</button>
                        <button onClick={() => updateHideInput()}>Wróć</button>
                    </InputArticleContainer>
                </InputShow>
            </article>
        </section>
     );
}
 
export default Article;

const ShowContent = styled.div`
    display: ${({showContent}) => showContent? 'block' : 'none'};
    padding: 20px; 
`;

const InputShow = styled.div`
    display: ${({showInput}) => showInput? 'block' : 'none'};
    padding: 20px;
    
`;

const InputArticleContainer = styled.div`
    display: flex;
    flex-flow: column;
    gap: 5px;
    font-size: 12px;
    height: calc(100vh - 218px);
    button {
        margin-top: 5px;
        width: 33%;
        background-color: transparent;
        border: 2px solid black;
        @media(min-width: 768px){
            width: 130px;
        }
    }
    @media(min-width: 768px){
            margin: 0 auto;
            max-width: 992px;
        }


`


const ArticleContainer = styled.div`
    display: flex;
    flex-flow: column;
    margin-bottom: 10px;
`




