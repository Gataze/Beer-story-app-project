import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addBeer } from "../store/beers";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import moment from "moment";
import { useHistory } from "react-router";



const Create = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [photo, setPhoto] = useState('')
    const author = useSelector(state => state.entities.styles.loggedIn.name)
    

    const history = useHistory();
    const dispatch = useDispatch();


    const createBeerArticle = (e) => {
        e.preventDefault()
        const data = {name: name, description: description, color: color, author: author, photo: photo, whoRated: [], date: moment().format('MMMM Do YYYY, h:mm:ss a'), id: uuidv4()}
        

        dispatch(addBeer(data))
        console.log(author)
        setName("");
        setColor("");
        setDescription("");

        history.push('/swiat')
    }


    




    return ( 
        <FormSection>
            <h2>Dodaj nowy artykuł</h2>
            <Form onSubmit={createBeerArticle}>
                <Label htmlFor="">Nazwa piwa:</Label>
                <Input type="text"  value={name} onChange={(e) => setName(e.target.value)}/>
                <Label htmlFor="">Link do zdjęcia:</Label>
                <Textarea type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                <Label htmlFor="">Opis piwa:</Label>
                <Textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Label htmlFor="">Kolor:</Label>
                <Input type="text" value={color} onChange={(e) => setColor(e.target.value)}/>
                <button >Dodaj piwo</button>
                <button onClick={() => history.push('/swiat')}>Wróć</button>
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

const Label = styled.label`
    font-size: 12px;
    margin: 5px 0 0;
    
`

const Input = styled.input`
    margin-bottom: 5px;
    border: 2px solid black;
`

const Textarea = styled.textarea`
    margin-bottom: 5px;
    border: 2px solid black;
`