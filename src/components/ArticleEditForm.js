import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectArticle } from "../store/beers";
import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import { updateBeer, loadBeers } from "../store/beers";
import { setEditMode } from "../store/beersStyles";

const ArticleEditForm = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const edit = useSelector(state => state.entities.styles.edit)

    //treść i dane na temat artykułuumieszczane formularzu edycji artykułu
    const inputValues = useSelector(selectArticle(id))[0]

    //Zmienne zawierające informacje o zmianach które będą wprowadzane do artykułu.
    const [beerName, setBeerName] = useState('');
    const [beerColor, setBeerColor] = useState('');
    const [beerDescription, setBeerDescription] = useState('');
    const [beerPhoto, setBeerPhoto] = useState('')

    useEffect(() => {

        if(inputValues){
            setBeerName(inputValues.name);
            setBeerColor(inputValues.color);
            setBeerDescription(inputValues.description);
            setBeerPhoto(inputValues.photo)
        }
        

    },[inputValues])

    
    //Funkcja zbiera zmapowane elementy macierzy beerDescription i edytuje je na podstawie ich indexu podczas edycji
    const handleDescription = (e, index) => {

        const value = e.target.value

        //Jesli index elementu w zmapowanej macierzy to 0/1/2/3/4 to zedytuj w stanie BeerDescription element o indexie 0/1/2/3/4
        switch(index){
            case 0: setBeerDescription(prevState => 
                prevState.map((item, index) => {
                    if(index === 0){
                        return ( 
                            item = value
                        )
                    }
                return item
            })); break;
            case 1: setBeerDescription(prevState => 
                prevState.map((item, index) => {
                    if(index === 1){
                        return ( 
                            item = value
                        )
                    }
                return item
            })); break;
            case 2: setBeerDescription(prevState => 
                prevState.map((item, index) => {
                    if(index === 2){
                        return ( 
                            item = value
                        )
                    }
                return item
            })); break;
            case 3: setBeerDescription(prevState => 
                prevState.map((item, index) => {
                    if(index === 3){
                        return ( 
                            item = value
                        )
                    }
                return item
            })); break;
            case 4: setBeerDescription(prevState => 
                prevState.map((item, index) => {
                    if(index === 4){
                        return ( 
                            item = value
                        )
                    }
                return item
            })); break;
        }
    }


    //Funkcja addNewParagraph umożliwia dodanie nowego pola textarea w gdy włączymy tryb edytowania
    const addNewParagraph = () => {

        const newField = '';
        setBeerDescription(prevState => prevState = [...prevState, newField])
    }

   
    

    //Aktualizcaja starych informacji w artykule
    const updateBeerArticle = (id, name, description, color, photo) => {

        const data = {id, name, description, color, photo};

            //wysyła dane do firebase
            dispatch(updateBeer(data));
            //pobiera zaktualizowane wartości z firebase
            dispatch(loadBeers());
            //ustawia EditMode na false co zmienia display formularza aktualizacji na 'none'
            dispatch(setEditMode(false))
            history.goBack();  
       
    }


    

    return ( 
    <InputShow showInput={edit} >
                    
        <ArticleContainer>
            <label>Nazwa: </label>
            <input type="text" value={beerName} onChange={(e) => setBeerName(e.target.value)} />
            <label>Link do zdjęcia: </label>
            <input type="text" value={beerPhoto} onChange={(e) => setBeerPhoto(e.target.value)} />
            <label>Akapity:</label>
            {beerDescription && beerDescription.map((descript, index) => (
                <ParagraphContainer key={index}>
                    <textarea rows='10' type="text" value={descript} onChange={(e) => handleDescription(e, index)} />
                </ParagraphContainer>
            ))}
            <button onClick={addNewParagraph}>Dodaj paragraf</button>

            
            <label>Bibliografia: </label>
            <input type="text" value={beerColor} onChange={(e) => setBeerColor(e.target.value)} />
        </ArticleContainer>
        
        <button onClick={() => updateBeerArticle(id, beerName, beerDescription, beerColor, beerPhoto)}>Aktualizuj</button>
        <button onClick={() => dispatch(setEditMode(false))}>Wróć</button>
    
    </InputShow> );
}
 
export default ArticleEditForm;



const InputShow = styled.div`
    display: ${({showInput}) => showInput? 'block' : 'none'};
    padding: 20px;
    
`;

const ArticleContainer = styled.div`
    display: flex;
    flex-flow: column;
    margin-bottom: 10px;
`

const ParagraphContainer = styled.p`
    display: flex;
    flex-flow: column;
`


