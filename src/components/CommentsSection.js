import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { commentBeer, deleteComment, selectArticleComments  } from "../store/beers";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {v4 as uuidv4} from 'uuid';

const CommentsSection = () => {

    
    const user = useSelector(state => state.entities.auth.user.username);
    const uid = useSelector(state => state.entities.auth.user.uid)
    const {id: articleId} = useParams();
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [showReminder, setShowReminder] = useState(false);
   
    // const commentsLoaded = useSelector(state => state.entities.beers.commentsList)

    const commentsLoaded = useSelector(selectArticleComments(articleId))



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

    
    

    const addComment = (e) => {
        e.preventDefault()
            
        if(user){
            dispatch(commentBeer(comment))
        } 
        else {
            setComment('')
            setShowReminder(true)
            
        }
        

        setComment({
            articleId: '',
            user: '',
            comment: '',
            date: '',
            userID: ''
        })

    }


    const deleteArticleComment = (id) => {

            dispatch(deleteComment(id))

    }

    


    return ( 
        <ArticleCommentsSection>
            <h2>Komentarze</h2>
            <CommentList>
                {commentsLoaded?.map(comment => (
                     <CommentItem key={comment.comment}>
                        <h2>@{comment.user}</h2>
                        <span>{comment.date}</span>
                        <div>
                            <p>{comment.comment}</p>
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
                    value={comment.comment}
                    onChange={(e) => Comment(e.target.value)}
                    ></textarea>
                <button onClick={addComment}>Wyślij</button>
            </CommentForm>
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

