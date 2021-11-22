import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addBeer } from "../store/beers";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import moment from "moment";
import { useHistory } from "react-router";


//Responsible for creating new articles
const Create = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    //Group of local states created to get data from inputs and textareas.
    const [name, setName] = useState('');
    const [description, setDescription] = useState([]);
    const [references, setReferences] = useState('');
    const [photo, setPhoto] = useState('');
    const [beerSection, setBeerSection] = useState('world')

    // Selectors for user username/uid 
    const author = useSelector(state => state.entities.auth.user.username);
    const uid = useSelector(state => state.entities.auth.user.uid);
    
    //Local states responsible for adding/deleting new paragraphs textareas.
    const [paragraphs, setParagraphs] = useState([{key: 1}])
    const [paragraphCounter, setParagraphCounter] = useState(2);

    //Function that controls adding new paragraphs. Number of paragraphs is restricted to 5.
    const addParagraph = () => {

        if(paragraphs.length >= 5){
            return alert('Twój artykuł nie może miec więcej niż 5 akapitów')
        }

        setParagraphCounter(prevState => (
            prevState = prevState + 1

        ))
        setParagraphs(prevState => (
            prevState = [...prevState, {key: paragraphCounter}]
        ))
    }

    //Deletes new paragraph textarea.
    const deleteParagraph = () => {
        setParagraphCounter(prevState => (
            prevState = prevState - 1
        ))

        setParagraphs(prevState =>       
            prevState = prevState.slice(0, -1)
            )
    }

    //Sets description of current paragraph based on index (i) from map function and textarea event (e) value (line: 129).
    const handleDescriptionOne = (e, i) => {

        const value = e.target.value
        switch(i){
            case 1: setDescription(prevState => ({
                        ...prevState, 
                        [i-1]: value
            })); break;
            case 2: setDescription(prevState => ({
                ...prevState, 
                [i-1]: value
            })); break;
            case 3: setDescription(prevState => ({
                ...prevState, 
                [i-1]: value
            })); break;
            case 4: setDescription(prevState => ({
                ...prevState, 
                [i-1]: value
            })); break;
            case 5: setDescription(prevState => ({
                ...prevState, 
                [i-1]: value
            })); break;
            default: console.log('unknown value'); break;

        }
 
    }

    // Gathers localStates and sends them as the article content to next functions that saves the data to Firebase and Redux store.  
    // Zbiera stany lokalne i wysyłe ja jako ar jako treść artykułu do firebase
    const createBeerArticle = (e) => {
        e.preventDefault()

        //Object.values(data.description) changes object to array.
        const data = {
            name: name, 
            description: Object.values(description), 
            references: references, 
            author: author, 
            photo: photo, 
            beerSection: beerSection,
            userID: uid, 
            date: moment().format('MMMM Do YYYY, h:mm:ss a'), 
            id: uuidv4()
        }
        
        //Dispatch function with data argument (article content).
        dispatch(addBeer(data))
        

        //Resets local states
        setName("");
        setReferences("");
        setDescription("");
        setPhoto("")

        history.goBack()
        
    }



    return ( 
        <FormSection>
            <h2>Dodaj nowy artykuł</h2>
            <Form>
               
                {/* Inputs for article title and link to article image */}
                <Label htmlFor="">Tytuł artykułu:</Label>
                <Input type="text"  value={name} onChange={(e) => setName(e.target.value)}/>
                <Label htmlFor="">Link do fotografii:</Label>
                <Input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />

                {/* Map paragraphs. When new object is added into paragraphs array (setParagraphs)(line: 41) another item with textarea is mapped on the page. Every textarea has 
                its own index from map function. This index makes handleDescription() know from which textarea the paragraph comes from. */}
                {paragraphs.map(p => (
                    <ArticleParts key={p.key}>

                        <Label htmlFor="">Akapit:</Label>
                        <Textarea type="text" value={description.paragraph1} onChange={(e) =>  handleDescriptionOne(e, p.key)} />
                    
                    </ArticleParts>
                ))}

                {/* Executes function that extends paragraphs array. */}
                <ParagraphAdd onClick={addParagraph}>Dodaj pole</ParagraphAdd>

                {/* If we have more than 2 paragraphs on the page display delete paragraph button.*/}
                {paragraphCounter > 2 && <ParagraphAdd onClick={deleteParagraph}>Usuń pole</ParagraphAdd>}
                
                
                <Label htmlFor="">Bibliografia:</Label>

                {/* Input for references. */}
                <Input type="text" value={references} onChange={(e) => setReferences(e.target.value)}/>
                <Label htmlFor="">Sekcja:</Label>

                {/* Select which section article belongs to. */}
                <Select onChange={(e) => setBeerSection(e.target.value) }>
                    <option value='world'>Historia piwa na świecie</option>
                    <option value='poland'>Historia piwa w Polsce</option>
                    <option value='lostrecipes'>Zapomniane Piwa</option>
                    <option value='oldbreweries'>Opuszczone Browary</option>
                </Select>

                {/* Executes function that adds new article */}
                <button onClick={createBeerArticle}>Opublikuj</button>

                {/* If user wants to go back to previosu page without adding article, this button has to be clicked*/}
                <button onClick={(e) => {e.preventDefault(); history.goBack(-1)}}>Wróć</button>
            </Form>
            
        </FormSection>
     );
}
 
export default Create;


const FormSection = styled.section`
    margin: 30px 0;
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-flow: column;
    width: 300px;
    margin: 0 auto;
    padding: 30px;
    text-align: left;

    button {
        width: 100px;
        margin-top: 20px;
        background-color: white;
        cursor: pointer;
    }
`


const Select = styled.select`
    border: 2px solid black;
`


const Label = styled.label`
    margin: 5px 0 0;
    font-size: 12px;
    
`

const Input = styled.input`
    margin-bottom: 5px;
    border: 2px solid black;
`


const ArticleParts = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    
`

const Textarea = styled.textarea`
    margin-bottom: 5px;
    border: 2px solid black;
`

const ParagraphAdd = styled.p`
        width: 100%;
        margin: 0 0 10px;
        padding: 0;
        border: none;
        font-size: 10px;
        text-align: left;
        text-decoration: underline;
        cursor: pointer;        
`