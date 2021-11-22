import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectArticle } from "../store/beers";
import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import { updateBeer, loadBeers } from "../store/beers";
import { setEditMode } from "../store/beersStyles";


//Component that is displayed after user clicks 'edytuj' button (Article component).
const ArticleEditForm = () => {

    //Id is used to get current article data from redux-store/
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    //Gets edit value from Redux store.
    const edit = useSelector(state => state.entities.styles.edit)

    //React-redux Selector of the article with given id.
    const inputValues = useSelector(selectArticle(id))[0]

    //Local states for input values from edit form.
    const [beerName, setBeerName] = useState('');
    const [beerReferences, setBeerReferences] = useState('');
    const [beerDescription, setBeerDescription] = useState('');
    const [beerPhoto, setBeerPhoto] = useState('')


    //If inputValues has some data than useEffect sets input values based on inputValues states.
    useEffect(() => {

        if(inputValues){
            setBeerName(inputValues.name);
            setBeerReferences(inputValues.references);
            setBeerDescription(inputValues.description);
            setBeerPhoto(inputValues.photo)
        }
        

    },[inputValues])


    //As artcile description can have more than one pragraph, the paragraps has to be mapped if we want to show and change them correctly.
    //Function handleDescription is used to get the paragraph based on its index in map function (line: 139). Event value contains current value of
    //of paragraph user is editting(textarea).
    const handleDescription = (e, index) => {

        const value = e.target.value

        //If index of the paragraph is 0/1/2/3/4 edit beerDescription state that contains paragraph of o the same index 0/1/2/3/4/.
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
            default: console.log('unknown value'); break;
        }
    }

    //Function addNewParagraph facilitates adding new textarea for new paragraph (after user clicks 'dodaj' button)
    const addNewParagraph = () => {

        const newField = '';
        setBeerDescription(prevState => prevState = [...prevState, newField])

    }

   
    

    //Function updateBeerArticle gets new edited article data, and dispatches actions with payload containing that data. Data is used to update firestore.
    //Loadbeers() gets new edited data from firestore. SetEditMode sets edit value as false so the component is no longer displayed.
    const updateBeerArticle = (id, name, description, color, photo) => {

        const data = {id, name, description, color, photo};

            dispatch(updateBeer(data));
            dispatch(loadBeers());
            dispatch(setEditMode(false))
            history.goBack();  
       
    }

    return ( 
    //If edit value is true set InputShow display as block.
    <InputShow showInput={edit} >
                    
        <ArticleContainer>
            <label>Nazwa: </label>
            <input type="text" value={beerName} onChange={(e) => setBeerName(e.target.value)} />
            <label>Link do zdjęcia: </label>
            <input type="text" value={beerPhoto} onChange={(e) => setBeerPhoto(e.target.value)} />
            <label>Akapity:</label>

            {/* If beerDescritpion has array with data map that data. Each array element should contain different paragraph.  */}
            {beerDescription && beerDescription.map((descript, index) => (
                <ParagraphContainer key={index}>
                    {/* Get index and event of mapped paragraph. Send event and index (of paragraph) as arguments to handleDescription function*/}
                    <textarea rows='10' type="text" value={descript} onChange={(e) => handleDescription(e, index)} />
                </ParagraphContainer>
            ))}
            {/* After this button is clicked, user adds new textarea for new paragraph */}
            <button onClick={addNewParagraph}>Dodaj paragraf</button>

            {/* Sets references values. Not finished yet.*/}
            <label>Bibliografia: </label>
            <input type="text" value={beerReferences} onChange={(e) => setBeerReferences(e.target.value)} />
        </ArticleContainer>
        
        {/* If user wants to update the article, 'Aktualizuj button' has to be clicked */}
        <button onClick={() => updateBeerArticle(id, beerName, beerDescription, beerReferences, beerPhoto)}>Aktualizuj</button>

        {/* If user wants to quit from edit mode this button should be clicked*/}
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


