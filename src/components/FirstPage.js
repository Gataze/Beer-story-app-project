
import { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import img1 from '../img/img-1.svg'
import img2 from '../img/img-2.svg'
import HomeArticle from "./HomeArticle";
import AgeVerificationForm from "./AgeVerificationForm";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";


const FirstPage = () => {


    const [ageVerified, setAgeVerified] = useState(false)

    useEffect(() => {

        setAgeVerified(localStorage.getItem('ageVerifiedBeerStory'))

    }, [ageVerified])




    return ( 
        <Main>
            <HomeArticle />
            <MainGrid>
                <Section>
                    <Link to='/articles/world'>
                        <img src={img1} alt="hello"/>
                        <h2>Historia Piwa na Świecie</h2>
                    </Link>
                </Section>
                <Section>
                    <Link to='/articles/lostrecipes'>
                        <img src={img2} alt="hello" />
                        <h2>Zapomniene receptury</h2> 
                    </Link>
                </Section>
                <Section>
                    <Link to='/articles/poland'>
                        <img src={img2} alt="hello" />
                        <h2>Historia piwa w Polsce</h2>     
                    </Link>
                </Section>
                <Section>
                    <Link to='/articles/oldbreweries'>
                        <img src={img1} alt="hello" />
                        <h2>Opuszczone browary</h2>
                    </Link>
                </Section>
            </MainGrid>
           <AgeVerificationForm ageVerified={ageVerified}/>
        </Main>
     );
}
 
export default FirstPage;


const Main = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(119, 119, 119);
    background: linear-gradient(90deg, rgba(119, 119, 119, 1) 0%, rgba(170, 170, 170, 1) 43%, rgba(170, 170, 170, 1) 85%, rgba(153, 153, 153, 1) 100%);
    gap: 60px;
`

const MainGrid = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 10px;
    
    @media (min-width: 992px) {
        display: grid;
        grid-template-columns: 280px 280px;
        gap: 40px;
        justify-items: center;
        justify-content: center;
        padding: 20px 0 75px;
    }
`

const Section = styled.section`
    display: flex;
    position: relative;
    overflow: hidden;
    z-index: 999;
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: center;
    width: 230px;
    height: 300px;
    margin: 20px 0;
    
    
    @media (min-width: 992px) {
        margin: 0px;
    }
    &:hover a>*{
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }

    a {
        display: flex;
        justify-content: center;
       

    img {
        position: absolute;
        top: 5px;
        width: 90%;
        filter: brightness(150%);
        transition: transform 0.3s ease-in-out;
    }

    h2 {
        position: absolute;
        bottom: 3px;
        width: 100%;
        background-color: rgba(195, 133, 0, 0.6); 
        box-shadow: 0px 2px 1px gray;
        color: white;
        font-size: 16px;
        font-weight: 400;
        line-height: 44px;
        text-align: center;
        transition: transform 0.3s ease-in-out;
        }
    }
`