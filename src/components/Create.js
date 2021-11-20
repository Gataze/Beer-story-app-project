import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addBeer } from "../store/beers";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import moment from "moment";
import { useHistory } from "react-router";



const Create = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState([]);
    const [references, setReferences] = useState('');
    const [photo, setPhoto] = useState('');
    const [beerSection, setBeerSection] = useState('world')

    


    const author = useSelector(state => state.entities.auth.user.username);
    const uid = useSelector(state => state.entities.auth.user.uid);
    

    const history = useHistory();
    const dispatch = useDispatch();


    const [paragraphs, setParagraphs] = useState([{key: 1}])
    const [paragraphCounter, setParagraphCounter] = useState(2);

    console.log(beerSection)

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






    const deleteParagraph = () => {
        setParagraphCounter(prevState => (
            prevState = prevState - 1
        ))

        

        setParagraphs(prevState => 
            
            prevState = prevState.slice(0, -1)
            )
    }

  

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

    //Zbiera stany lokalne i wysyłe ja jako treść artykułu do firebase
    const createBeerArticle = (e) => {
        e.preventDefault()

        //Object.values(data.description) zmienia objekt na macierz
        const data = {
                    name: name, 
                    description: Object.values(description), 
                    references: references, 
                    author: author, 
                    photo: photo, 
                    beerSection: beerSection,
                    userID: uid, 
                    date: moment().format('MMMM Do YYYY, h:mm:ss a'), 
                    id: uuidv4()}
        
        dispatch(addBeer(data))
        console.log(author)
        setName("");
        setReferences("");
        setDescription("");
        history.goBack()
        
    }

//  console.log([...description] + paragraphs.toString())




    return ( 
        <FormSection>
            <h2>Dodaj nowy artykuł</h2>
            <Form>
               
                <Label htmlFor="">Tytuł artykułu:</Label>
                <Input type="text"  value={name} onChange={(e) => setName(e.target.value)}/>
                <Label htmlFor="">Link do fotografii:</Label>
                <Input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                {paragraphs.map(p => (
                    <ArticleParts key={p.key}>
                    <Label htmlFor="">Akapit:</Label>
                    <Textarea type="text" value={description.paragraph1} onChange={(e) =>  handleDescriptionOne(e, p.key)} />
                    
                    </ArticleParts>
                ))}
                <ParagraphAdd onClick={addParagraph}>Dodaj pole</ParagraphAdd>
                {paragraphCounter > 2 && <ParagraphAdd onClick={deleteParagraph}>Usuń pole</ParagraphAdd>}
                
                
                <Label htmlFor="">Bibliografia:</Label>
                <Input type="text" value={references} onChange={(e) => setReferences(e.target.value)}/>
                <Label htmlFor="">Sekcja:</Label>
                <Select onChange={(e) => setBeerSection(e.target.value) }>
                    <option value='world'>Historia piwa na świecie</option>
                    <option value='poland'>Historia piwa w Polsce</option>
                    <option value='lostrecipes'>Zapomniane Piwa</option>
                    <option value='oldbreweries'>Opuszczone Browary</option>
                </Select>
                <button onClick={createBeerArticle}>Opublikuj</button>
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
    padding: 30px;
    margin: 0 auto;
    text-align: left;
    button {
        width: 100px;
        background-color: white;
        cursor: pointer;
        margin-top: 20px;
    }
`


const Select = styled.select`
    border: 2px solid black;
`


const Label = styled.label`
    font-size: 12px;
    margin: 5px 0 0;
    
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
        border: none;
        font-size: 10px;
        margin: 0 0 10px;
        padding: 0;
        width: 100%;
        text-align: left;
        text-decoration: underline;
        cursor: pointer;
`