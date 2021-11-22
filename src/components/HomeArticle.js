import styled from "styled-components";


// Hardcoded hero section article that explains what BeerStory webpage is about.
const HomeArticle = () => {


    return ( 
        <ArticleHome>
            <h2>Co to BeerStory?</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sint temporibus voluptates. Assumenda, incidunt excepturi placeat sunt, dolorum impedit saepe aut doloribus dicta beatae perferendis officiis neque sed quia ratione! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis, quasi explicabo necessitatibus reprehenderit numquam architecto ipsum, sit repellendus optio distinctio nihil. Sequi asperiores et ea amet odit porro! Nostrum, beatae?</p>
        </ArticleHome>
     );
}


const ArticleHome = styled.article`
    display: none;
    width: 380px;
    margin-left: 25px;
    color: white;
    text-align: justify;

    h2 {
        margin-bottom: 20px;
    }

    @media (min-width: 1200px) {
        display: block;
        
    }

`
 
export default HomeArticle;