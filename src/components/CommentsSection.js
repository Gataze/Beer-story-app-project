import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { commentBeer, selectArticle } from "../store/beers";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const CommentsSection = () => {

    
    const user = useSelector(state => state.entities.auth.user.username)
    const {id} = useParams();
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    
    const commentsLoaded = useSelector(selectArticle(id))[0]?.comments



    const Comment = (comment) => {
        
        
            setComment({
                id: id,
                user: user,
                comment: comment,
                date: moment().format('MMMM Do YYYY, h:mm:ss a')
            }) 
        
        
    }

    

    const addComment = (e) => {
        e.preventDefault()
            
        if(user){
            dispatch(commentBeer(comment))
        } 
        else {
            alert('please log-in')
        }
        

        setComment({
            id: '',
            user: '',
            comment: '',
            date: ''
        })

    }


    const deleteComment = (id) => {

        

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
                            <FontAwesomeIcon icon={faTrash} onClick={() => deleteComment(id)}/>
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
            
        </ArticleCommentsSection>
     );
}
 
export default CommentsSection;


const ArticleCommentsSection = styled.section`

    display: flex;
    flex-flow: column;
    margin: 50px 0;
`


const CommentList = styled.ul`
    display: flex;
    flex-flow: column;
    padding: 0;
    list-style-type: none;
    gap: 10px;
    margin-top: 20px;


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
        margin-top: 5px;
        background-color: transparent;
        border: 2px solid black;
        width: 102px;

    }
`

