import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { rateBeer } from "../store/beers";
import { useParams } from "react-router";
import { useState } from "react";


const BeerCounter =  () => {

    const {id: articleId} = useParams()
    const dispatch = useDispatch();

    //selektor danych osób które oceniły dany artykuł wraz z ich ocenami
    // const rating = useSelector(selectArticle(id))[0]?.whoRated

    const rating = useSelector(state => state.entities.beers.rates)


    //selektor sprawdzajacy czy loggedIn is true
    const uid = useSelector(state => state.entities.auth.user.uid);

    //stan kontrolujacy wyswietlanie sie wiadomosci o oniecznosci zalogowania sie jezeli trzeba sie zalogowac
    const [showLogInRequest, setShowLogInRequest] = useState(false)

    //stan kontrolujacy wyswietlanie sie wiadomosci o wczesniejszym ocenieniu danego artykułu
    const [showReminder, setShowReminder] = useState(false)

    //stan kontrolujacy podswietlenie gwiazdek na pasku oceny artykułu po najechaniu na gwiazdki
    const [hover, setHover] = useState(null)

    //map mapuje oceny z obiektu zawierajacargo emaile oraz oceny z nimi powiązane

    
    
   //1? dodana tylko po to aby kolejne wartosci tez sie zliczyly (bez error) po odświeżeniu strony
    const gradeArray = (rating?.length)? rating.map(grade => {
        return grade.gradeArrayItem
    }) : [0]
    


    // // zbiera sumę wszystkich wartosci w macierzy 
    const sum = gradeArray? gradeArray.reduce((a, b) => a + b) : 0

    // // oblicza srednia ocen
    const mean = Math.round((sum / gradeArray.length) * 100) / 100
    
    
    
    // // tworzy macierz użytkowników ktorzy ocenili artykul
    const ratersID = rating? rating.map(grade => {
        return grade.userID
    }) : null;

    
    //Funkja kontroluje dispatchowanie akcji wysylajacych dane na serwer o ocenie dodanej przez uzytkownika.
    //Jesli uzytkownik dodal juz ocene lub jest nie zalogowany wtedy odsyla do zalogowania lub przypomina o wczesniejszej ocenie
    const rateBeerArticle = (articleId, grade) => {

        const found = ratersID?.find(raterID => raterID === uid)
     

        //If user is not logged in show msg that he should login or register
        if(!uid) {setShowLogInRequest(true)} else {


            if(found){

                setShowReminder(true)
                
             } else {
 
                     const gradeArrayItem = grade
                     const userID = uid
                     const id = uid + articleId
                     const articleID = articleId
                     const data = {gradeArrayItem, articleID, userID, id}
                     dispatch(rateBeer(data))
 
             }
        }     
    }

    

    return ( 
        <BeerCounterContainer >
           
            <div>Ocenili: {rating? rating.length : null}</div>
            <InfoForUSer showLogInRequest={showLogInRequest}>
                <p>Zaloguj się aby ocenić artykuł</p>
                <button onClick={() => setShowLogInRequest(false)}>X</button>
            </InfoForUSer>
            <InfoForUSer showReminder={showReminder}>
                <p>Już oceniłeś ten artykuł</p>
                <button onClick={() => setShowReminder(false)}>X</button>
            </InfoForUSer>
            <Container>
           
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;


                    return (
                        <Star 
                            key={i}
                            ratingValue={ratingValue} 
                            rating={mean? mean : null}
                            hover={hover}
                            onClick={() => rateBeerArticle(articleId, i + 1)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            >
                            <FontAwesomeIcon icon={faStar}/>
                        </Star>
                    )
                })}



               
                <BeerArticleGrade>Średnia: {mean}</BeerArticleGrade>
            </Container>
                
            
        </BeerCounterContainer>
     );
}
 
export default BeerCounter;


const BeerCounterContainer = styled.div`
    display: block;
    padding-bottom: 0;
`


const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    
    
    svg {
        
        font-size: 13px;
        &:hover {
            color: gold;
        }
        
    }

`

const BeerArticleGrade = styled.span`
        margin-left: 5px;

`

// const GiveBeer = styled.p`
//     margin: 0;
//     font-size: 11px;

// `


const InfoForUSer = styled.div`
    display: ${({showLogInRequest, showReminder}) => (showLogInRequest || showReminder)? 'flex' : 'none'};
    flex-flow: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 999;
    background-color: rgba(0,0,0,0.7);
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    color: white;

    button {
        color: black;
        cursor: pointer;
    }

    p {
        font-size: 30px;
    }
`
    

const Star = styled.div`
    color: ${({ratingValue, rating, hover}) => ratingValue <= (hover || rating)? 'gold' : 'black'}
`