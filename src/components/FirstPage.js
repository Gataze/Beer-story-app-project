
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
                    <Overlay>
                        <article>
                            <Link to='/articles/world'>
                                <One>
                                    <h2>Historia Piwa na Świecie</h2>
                                </One>
                            </Link>
                        </article>
                        <OneImg src={img1} alt="hello"/>
                    </Overlay>
                </Section>
                <Section>
                    <Overlay>
                        <article>
                            <Link to='/articles/lostrecipes'>
                                <Two>
                                    <h2>Zapomniene receptury</h2> 
                                </Two>
                            </Link>
                        </article>
                        <TwoImg src={img2} alt="hello" />
                    </Overlay>
                </Section>
                <Section>
                    <Overlay>
                        <article>
                        <Link to='/articles/poland'>
                                <Three>
                                    <h2>Historia piwa w Polsce</h2>
                                </Three>
                            </Link>
                        </article>
                        <ThreeImg src={img2} alt="hello" />
                    </Overlay>
                </Section>
                <Section>
                    <Overlay>
                        <article>
                            <Link to='/articles/oldbreweries'>
                                <Four>
                                    <h2>Opuszczone browary</h2>
                                </Four>
                            </Link>
                        </article>
                        <FourImg src={img1} alt="hello" />
                    </Overlay>
                </Section>
            </MainGrid>
           <AgeVerificationForm ageVerified={ageVerified}/>
        </Main>
     );
}
 
export default FirstPage;


const Main = styled.main`
    display: flex;
    background: rgb(119,119,119);
    background: linear-gradient(90deg, rgba(119,119,119,1) 0%, rgba(170,170,170,1) 43%, rgba(170,170,170,1) 85%, rgba(153,153,153,1) 100%);
    align-items: center;
    justify-content: center;
    gap: 60px;
`

const MainGrid = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 10px;
    @media(min-width: 992px){
        display: grid;
        grid-template-columns: 280px 280px;
        gap: 30px;
        justify-items: center;
        justify-content: center;
        padding: 20px 0 75px;
    }
`

const Section = styled.section`
    display: flex;
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    width: 230px;
    height: 280px;
    z-index: 999;
    margin: 20px 0;
   
    
    
    @media(min-width: 992px){
        margin: 0px;

        
    }
    img {
        position: absolute;
        top: 5px;
        width: 100%;
        height: 80%;
    }


`

//Keyframes animacji sekwencji wyświetlania kafelków na stronie głownej
const opacityChange = keyframes`
from {
    opacity: 0;
    
}

to {
    opacity: 1;
    
}
`


//Kafelki których dotyczy animacja
const One = styled.div`
    animation: ${opacityChange} 0.5s ease-in-out forwards 0s;
`
const Two = styled.div`
    animation: ${opacityChange} 0.5s ease-in-out forwards 0.5s ;
`
const Three = styled.div`
    animation: ${opacityChange} 0.5s ease-in-out forwards 1s ;
`
const Four = styled.div`
    animation: ${opacityChange} 0.5s ease-in-out forwards 1.5s ; 
`

//Keyframes animujący zmianę brightness i opacity zdjęc na stronie głownej
const brightnessChange = keyframes`
    from {
    filter: brightness(100%);
    opacity: 0;
}
    to { 
    filter: brightness(140%);
    opacity: 1;
}
`

 const OneImg = styled.img`
    overflow: hidden;
     animation: ${brightnessChange} 0.5s ease-in-out forwards 0s;
 `
 const TwoImg = styled.img`
     animation: ${brightnessChange} 0.5s ease-in-out forwards 0.5s;
 `
 const ThreeImg = styled.img`
     animation: ${brightnessChange} 0.5s ease-in-out forwards 1s;
 `
 const FourImg = styled.img`
     animation: ${brightnessChange} 0.5s ease-in-out forwards 1.5s; 
     &:hover {
             /* animation-play-state: paused; */
             mix-blend-mode: multiply;
         }
`

const Overlay = styled.div`
    display: flex;
    box-sizing: border-box;
    position: absolute;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 1;
    padding: 0px;
    background-color: transparent;
    border: 0px solid black;
    transition: all 0.3s ease-in-out;
    

    &:hover *{
        transform: scale(1.04);
    }

    * {
        transition: all 0.3s ease-in-out;
    }

    &:hover h2{
        bottom: 13px;
    }
    
    img {
        position: absolute;
        z-index: -1;
        width: 90%;
        opacity: 0;
        background-color: transparent;
        filter: brightness(110%);
        transition: all 0.3s ease-in-out;
     
    }

    a {
        text-decoration: none;
    }
    
    article{
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        

        div {
            
            opacity: 0;
            position: relative;
            height: 100%;
            z-index: 0;
            background-color: transparent;
            h2 {
            text-align: center;
            position: absolute;
            color: white;
            bottom: 3px;
            font-weight: 400;
            width: 100%;
            font-size: 16px;
            line-height: 44px;
            background-color: rgba(195, 133, 0, 0.6); 
            box-shadow: 0px 2px 1px gray;
            }

            

            
         button {
            display: block;
            color: white;
            background: none;
            border: 2px solid white;
            padding: 10px 20px;
            text-transform: uppercase;
            margin: 50px auto;
            font-size: 18px;
            font-weight: 600;

            a {
                color: white;
                text-decoration: none;
            }
        }} 
    } 
`





