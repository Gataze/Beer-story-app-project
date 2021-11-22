import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { rateBeer } from "../store/beers";
import { useParams } from "react-router";
import { useState } from "react";


//BeerCounter components displays the mean number of stars given by users for selected article
const BeerCounter =  () => {
  
    const {id: articleId} = useParams()
    const dispatch = useDispatch();

    //Selects documents in redux store with ratings of curently displayed article  
    const rating = useSelector(state => state.entities.beers.rates)

    //Selects uid of currently logged-in user
    const uid = useSelector(state => state.entities.auth.user.uid);

    //Local state with true/false value. If true/false Login request msg is/is not displayed.
    const [showLogInRequest, setShowLogInRequest] = useState(false)


    //Local state that is used to change styles of stars displayed in component
    const [hover, setHover] = useState(null)
    
   //Maps documents in redux store with ratings of curently displayed article. Returns all rating values.
    const gradeArray = (rating?.length)? rating.map(grade => {
        return grade.gradeArrayItem
    }) : [0]
    

    //Calculate mean of ratings of each user
    const sum = gradeArray? gradeArray.reduce((a, b) => a + b) : 0
    const mean = Math.round((sum / gradeArray.length) * 100) / 100
    

    //Function rateBeerArticle dispatches rateBeer() function that takes data{grade, id, articleID, userID}. This data is mandatory if rates have to be displayed
    //properly on the website. 
    const rateBeerArticle = (articleId, grade) => {

        //If user is not logged in show msg that he should login or register.
        if(!uid) {setShowLogInRequest(true)} else {

            const gradeArrayItem = grade
            const userID = uid
            const id = uid + articleId
            const articleID = articleId
            const data = {gradeArrayItem, articleID, userID, id}
            dispatch(rateBeer(data))
            
        }     
    }

    

    return ( 
        <BeerCounterContainer >

            {/* If article was rated before show how many times it was rated */}
            <div>Ocenili: {rating? rating.length : null}</div>

            {/* If user is not logged and wants to rate the article, this component will display the msg 'Zaloguj się aby ocenić artykuł' */}
            <InfoForUSer onClick={() => setShowLogInRequest(false)} showLogInRequest={showLogInRequest}>
                <p>Zaloguj się aby ocenić artykuł</p>
            </InfoForUSer>
            
            <Container>
           
                {/* Maps array of stars. Depending on the current user rating stars have different styles. */}
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;

                    return (
                        <Star 
                            key={i}
                            ratingValue={ratingValue} 
                            rating={mean? mean : null}
                            hover={hover}
                            // If user click the star with index (0,1,2,3,4), this index will serve as a rate given to the article.
                            onClick={() => rateBeerArticle(articleId, i + 1)}
                            //ratingValue changes everytime mouse hovers over displayed stars
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            >
                            <FontAwesomeIcon icon={faStar}/>
                        </Star>
                    )
                })}
                {/* Show mean value of rates given by users to the article */}
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


const InfoForUSer = styled.div`
    display: ${({showLogInRequest, showReminder}) => (showLogInRequest || showReminder)? 'flex' : 'none'};
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;

    p {
        font-size: 30px;
    }
`
    

const Star = styled.div`
    color: ${({ratingValue, rating, hover}) => ratingValue <= (hover || rating)? 'gold' : 'black'}
`