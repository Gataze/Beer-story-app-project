import styled from "styled-components";
import Article from "./Article";
import ArticleEditForm from "./ArticleEditForm";


const ArticleControllers = () => {

    //usunięto 11.11.2021 
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(setEditMode(true))
    // })


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
min-height: calc(100vh - 218px);
padding: 20px;
font-size: 12px;
gap: 5px;
@media (min-width: 768px) {
        max-width: 992px;
        margin: 0 auto;
}`




