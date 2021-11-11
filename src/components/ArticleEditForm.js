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

    const user = useSelector(state => state.entities.auth.user.username);

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

    
    

    //Aktualizcaja starych informacji w artykule
    const updateBeerArticle = (id, name, description, color, photo) => {

        const data = {id, name, description, color, photo};

        //If user is not the author do not allow to edit/ send msg to user
        if(user === inputValues.author){
                //wysyła dane do firebase
            dispatch(updateBeer(data));
            //pobiera zaktualizowane wartości z firebase
            dispatch(loadBeers());
            //ustawia EditMode na false co zmienia display formularza aktualizacji na 'none'
            dispatch(setEditMode(false))
            history.goBack();

        } else {
            console.log(`Hey what are you doing ${user}?`)
        }
       
    }


    

    return ( 
    <InputShow showInput={edit} >
                    
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
        <button onClick={() => dispatch(setEditMode(true))}>Wróć</button>
    
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


