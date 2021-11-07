import styled from "styled-components";
import { keyframes } from "styled-components";
import { Link } from "react-router-dom";

import img1 from '../img/img-1.svg'
import HomeArticle from "./HomeArticle";


const FirstPage = () => {


    return ( 
        <Main>
            <HomeArticle />
            <MainGrid>
                <Section>
                    <Overlay>
                        <article>
                            <One>
                                <h2>Historia piwa w Polsce</h2>
                                <button><Link to='/swiat'>Więcej</Link></button>
                            </One>
                            
                        </article>
                        <OneImg src={img1} alt="hello" />   
                    </Overlay>
                </Section>
                <Section>
                    <Overlay>
                        <article>
                            <Two>
                                <h2>Historia piwa na świecie</h2>
                                <button><Link to='/swiat'>Więcej</Link></button>
                            </Two>
                            
                        </article>
                        <TwoImg src={img1} alt="hello" />
                    </Overlay>
                </Section>
                <Section>
                    <Overlay>
                        <article>
                            <Three>
                                <h2>Zapomniane piwa</h2>
                                <button><Link to='/swiat'>Więcej</Link></button>
                            </Three>
                        </article>
                        <ThreeImg src={img1} alt="hello" />
                    </Overlay>
                </Section>
                <Section>
                    <Overlay>
                        <article>
                            <Four>
                                <h2>Opuszczone browary</h2>
                                <button><Link to='/swiat'>Więcej</Link></button>
                            </Four>
                        </article>
                        <FourImg src={img1} alt="hello" />
                    </Overlay>
                </Section>
            </MainGrid>
           
              
        </Main>
     );
}
 
export default FirstPage;


const Main = styled.main`
    display: flex;
    background-color: #4A5859;
    align-items: center;
    justify-content: center;
    gap: 80px;
`

const MainGrid = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 30px;
    @media(min-width: 992px){
        display: grid;
        grid-template-columns: 400px 400px;
        justify-items: center;
        justify-content: center;
        padding: 50px 0 75px;
    }
`

const Section = styled.section`
    position: relative;
    width: 350px;
    height: 350px;
    background-color: #4A5859;
    margin: 20px 0;
    @media(min-width: 992px){
        margin: 20px;
        &:nth-child(even){
            transform: translateY(25px);
        }
        &:nth-child(odd){
            transform: translateY(-35px);
        }
        
    }
    img {
        width: 100%;
        height: 100%;
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
    filter: brightness(70%);
    opacity: 1;
}
`

const OneImg = styled.img`
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
    position: absolute;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    z-index: 1;
    background-color: #4A5859;
    transition: all 0.3s ease-in-out;

    

    img {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: transparent;
        filter: brightness(100%);
        
        

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
            //tu
            background-color: transparent;
            h2 {
            
            text-align: center;
            color: white;
            width: 80%;
            margin: 0 auto;
            padding-top: 90px;
            font-weight: 400;
            
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

        }
        } 
        
        /* opacity: 0; */
        /* background: rgb(244,184,96); */
        /* background: linear-gradient(117deg, rgba(244,184,96,0.3085609243697479) 0%, rgba(244,184,96,0.5130427170868348) 63%, rgba(244,184,96,1) 100%); */
        /* opacity: 0.9;
        filter: grayscale(0.2); */
        /* &:hover {
            background: black;
            background-color: rgba(0,0,0,0.4);
            transition: all 0.4s ease-in-out;
        }
        &:hover h2{
            opacity: 1;
            transition: all 0.4s ease-in-out;
        }

        &:hover button{
            opacity: 1;
            transition: all 0.4s ease-in-out;
        } */
        
         

        

    }
     
`



