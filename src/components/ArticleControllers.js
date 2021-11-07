import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { deleteBeer, loadBeers, updateBeer, selectArticle } from "../store/beers";
// import { loadState } from "../localStorage";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import styled from "styled-components";
// import { auth } from "../firebase/firebase.config";
// import { onAuthStateChanged } from "@firebase/auth";
import Article from "./Article";
import { setEditMode } from "../store/beersStyles";

const ArticleControllers = () => {

    
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const edit = useSelector(state => state.entities.styles.edit)
    const inputValues = useSelector(selectArticle(id))



    //Zmienne zawierające informacje o zmianach które będą wprowadzane do artykułu.
    const [beerName, setBeerName] = useState(inputValues[0].name);
    const [beerColor, setBeerColor] = useState(inputValues[0].color);
    const [beerDescription, setBeerDescription] = useState(inputValues[0].description);
    const [beerPhoto, setBeerPhoto] = useState(inputValues[0].photo)

    
    //Funckja updateBeerArticle aktualizuje zmienione wartości 'color', wysyła dane do firebase, nastepnie pobiera zaktualizowaną wartośc z firebase.
    const updateBeerArticle = (id, name, description, color, photo) => {

        const data = {id, name, description, color, photo};

        //wysyła dane do firebase
        dispatch(updateBeer(data));
        //pobiera zaktualizowane wartości z firebase
        dispatch(loadBeers());
        dispatch(setEditMode(false))
        history.goBack();
    }

    
    

    return ( 
        <section>
        
                <ShowContent showContent={!edit}>
                    <InputArticleContainer>
                        <Article/>
                    </InputArticleContainer>          
                </ShowContent>
                <InputShow showInput={edit}>
                    
                        <ArticleContainer>
                            <label>Nazwa: </label>
                            <input type="text" value={beerName} onChange={(e) => setBeerName(e.target.value)} />
                            <label>Link do zdjęcia: </label>
                            <input type="text" value={beerPhoto} onChange={(e) => setBeerPhoto(e.target.value)} />
                            <label>Opis: </label>
                            <textarea rows='10' type="text" value={beerDescription} onChange={(e) => setBeerDescription(e.target.value)} />
                            <label>Kolor: </label>
                            <input type="text" value={beerColor} onChange={(e) => setBeerColor(e.target.value)} />
                        </ArticleContainer>
                        
                        <button onClick={() => updateBeerArticle(id, beerName, beerDescription, beerColor, beerPhoto)}>Aktualizuj</button>
                        <button onClick={() => dispatch(setEditMode(false))}>Wróć</button>
                    
                </InputShow>
            
        </section>
     );
}
 
export default ArticleControllers;

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
    min-height: calc(100vh - 218px);
    
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




