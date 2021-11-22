import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { commentBeer, deleteComment, selectArticleComments  } from "../store/beers";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {v4 as uuidv4} from 'uuid';



// CommentsSection component is responsible for adding/displaying/deleting user comments.
const CommentsSection = () => {

    const dispatch = useDispatch();

    //user username selector.
    const user = useSelector(state => state.entities.auth.user.username);

    //user uid selector.
    const uid = useSelector(state => state.entities.auth.user.uid)

    const {id: articleId} = useParams();
    
    //Comment used to set comment data.
    const [comment, setComment] = useState('');

    //When true, <InfoForUSer> msg 'Zaloguj się aby dodać komentarz' is displayed.
    const [showReminder, setShowReminder] = useState(false);
   
    //Selector that gets comments linked with selected article.
    const commentsLoaded = useSelector(selectArticleComments(articleId))

    //Comment function creates comment object. This object contains: its own id, id of commented article, ucomment added by user, username, userID, and tha date of creation.
    const Comment = (comment) => {
        
        setComment({
            articleId: articleId,
            id: uuidv4(),
            comment: comment,
            user: user,
            userID: uid,
            date: moment().format('MMMM Do YYYY, h:mm:ss a')
        })     
    }

    //Function addComment adds dispatches commentBeer() function that is responsible for dispatching actions and functions which saves new comment to Firestore and Redux store.
    const addComment = (e) => {
        e.preventDefault()
            
        //if user is logged in, the value of user is not undefined.
        if(user){
            dispatch(commentBeer(comment));
        } 
        else {
            setComment('');
            setShowReminder(true);
        }
        
        //Reset comment object.
        setComment({
            articleId: '',
            user: '',
            comment: '',
            date: '',
            userID: ''
        })

    }

    //Dispatches function responsible for deleting comments from Firestore and Redux store.
    const deleteArticleComment = (id) => {

            dispatch(deleteComment(id));

    }

    

    return ( 
        <ArticleCommentsSection>
            <h2>Komentarze</h2>
            <CommentList>
                {/* Map all comments linked with the article (if there is any). */}
                {commentsLoaded?.map(comment => (
                     <CommentItem key={comment.comment}>
                        <h2>@{comment.user}</h2>
                        <span>{comment.date}</span>
                        <div>
                            <p>{comment.comment}</p>
                            {/* Delete article comment. */}
                            <FontAwesomeIcon icon={faTrash} onClick={() => deleteArticleComment(comment.id)}/>
                        </div>
                    </CommentItem>
                ))}
            </CommentList>
            <CommentForm>
                <label htmlFor="">Dodaj komentarz</label>
                <textarea 
                    placeholder='Twój komentarz...' 
                    rows="5"
                    // Comment value inside newly created comment object.
                    value={comment.comment}
                    //Create comment object with the data written in textarea (e.target.value == comment msg).
                    onChange={(e) => Comment(e.target.value)}
                    ></textarea>
                {/* Run addComment function */}
                <button onClick={addComment}>Wyślij</button>
            </CommentForm>
            {/* If reminder msg is shown, click on it to hide. */}
            <InfoForUSer onClick={() => setShowReminder(false)} showReminder={showReminder}>
                <p>Zaloguj się aby dodać komentarz</p>
            </InfoForUSer>
        </ArticleCommentsSection>
     );
}
 
export default CommentsSection;


const ArticleCommentsSection = styled.section`
    display: flex;
    position: relative;
    flex-flow: column;
    margin: 50px 0;
`

const CommentList = styled.ul`
    display: flex;
    flex-flow: column;
    margin-top: 20px;
    padding: 0;
    list-style-type: none;
    gap: 10px;

`

const CommentItem = styled.li`
    display: flex;
    flex-flow: column;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;

    h2 {
        font-size: 10px;
    }

    span {
        font-size: 9px;
    }

    div {
        display: flex;
        justify-content: space-between;    

        svg {
            font-size: 9px;
        }

        svg:hover {
            color: gray;
        }
    }
`


const CommentForm = styled.form`
    display: flex;
    flex-flow: column;
    margin-top: 50px;

    button {
        width: 102px;
        margin-top: 5px;
        border: 2px solid black;
        background-color: transparent;

    }
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

