import styled from "styled-components";


const CommentsSection = () => {



    return ( 
        <ArticleCommentsSection>
            <h2>Komenatarze</h2>
            <CommentList>
                <CommentItem>
                    <h2>@Kowlaski</h2>
                    <span>December 12 2020 15:34</span>
                    <p>Lorem ipsum dobre!</p>
                </CommentItem>
                <CommentItem>
                    <h2>@Kowlaski</h2>
                    <p>Lorem ipsum dobre!</p>
                </CommentItem>
            </CommentList>
            <CommentForm>
                <label htmlFor="">Dodaj komentarz</label>
                <textarea placeholder='Twój komentarz...' name="" id="" rows="5"></textarea>
                <button>Wyślij</button>
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

