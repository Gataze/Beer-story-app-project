import styled from "styled-components";
import { Link } from "react-router-dom";

import img1 from '../img/beer-story-1.jpg'
import HomeArticle from "./HomeArticle";


const FirstPage = () => {


    return ( 
        <Main>
            <HomeArticle />
            <MainGrid>
            <Section>
                <Overlay>
                    <article>
                        <h2>Historia piwa w Polsce</h2>
                        <button>Więcej</button>
                    </article>
                    <img src={img1} alt="hello" />   
                </Overlay>
            </Section>
            <Section>
            <Overlay>
                    <article>
                        <h2>Historia piwa na świecie</h2>
                        <button><Link to='/swiat'>Więcej</Link></button>
                    </article>
                    <img src={img1} alt="hello" />
                </Overlay>
            </Section>
            <Section>
            <Overlay>
                    <article>
                        <h2>Zapomniane style piwne</h2>
                        <button>Więcej</button>
                    </article>
                    <img src={img1} alt="hello" />
                </Overlay>
            </Section>
            <Section>
            <Overlay>
                    <article>
                        <h2>Opuszczone browary</h2>
                        <button>Więcej</button>
                    </article>
                    <img src={img1} alt="hello" />
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
        grid-template-columns: 300px 300px;
        justify-items: center;
        justify-content: center;
        padding: 70px 0 50px;
        padding: 50px 0;
    }
`

const Section = styled.section`
    position: relative;
    width: 300px;
    height: 300px;
    background-color: white;
    width: 250px;
    height: 250px;
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

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: -7px;
    top: -7px;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all 0.3s ease-in-out;
    img {
        width: 100%;
        height: 100%;
    }
    &:hover{
            transition: all 0.5s ease-in-out;
            top: 0;
            left: 0;
        }
    article{
        position: absolute;
        width: 100%;
        height: 100%;
        box-shadow: 2px 2px 6px 0px black;
        background: rgb(244,184,96);
        background: linear-gradient(117deg, rgba(244,184,96,0.3085609243697479) 0%, rgba(244,184,96,0.5130427170868348) 63%, rgba(244,184,96,1) 100%);
        opacity: 0.9;
        filter: grayscale(0.2);
        h2 {
            text-align: center;
            color: white;
            width: 80%;
            margin: 60px auto 0;
            font-weight: 400;
            @media(min-width: 992px){
                margin: 50px auto 0;
            }
        }
        button {
            display: block;
            background: none;
            color: white;
            border: 2px solid white;
            padding: 10px 20px;
            text-transform: uppercase;
            margin: 40px auto;
            @media(min-width: 992px){
                margin: 35px auto 0;
            }
        }

    }
     
`



