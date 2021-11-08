import { useDispatch } from "react-redux";
import styled from "styled-components";
import Article from "./Article";
import { setEditMode } from "../store/beersStyles";
import ArticleEditForm from "./ArticleEditForm";
import { useEffect } from "react";

const ArticleControllers = () => {

    const dispatch = useDispatch();
   
    useEffect(() => {

        dispatch(setEditMode(true))
        
    }, [])


    return ( 
        
            <ArticleContent>
                <Article />
                <ArticleEditForm/>   
            </ArticleContent>
                   
     );
}

 
export default ArticleControllers;

const ArticleContent = styled.div`
display: flex;
flex-flow: column;
gap: 5px;
font-size: 12px;
padding: 20px;
min-height: calc(100vh - 218px);
@media(min-width: 768px){
        margin: 0 auto;
        max-width: 992px;
}`




