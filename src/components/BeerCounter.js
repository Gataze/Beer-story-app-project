import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';

const BeerCounter = () => {
    return ( 
        <BeerCounterContainer>
            <Container>
                <FontAwesomeIcon icon={faBeer} />
                <span>Daj piwo</span>
            </Container>
                
            
        </BeerCounterContainer>
     );
}
 
export default BeerCounter;


const BeerCounterContainer = styled.div`
    width: 50px;
    height: 50px;
`


const Container = styled.article`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    border: 2px solid black;
    border-radius: 10px;
    cursor: pointer;
    &:hover svg {
            color: gold;
        }
    
   

    svg {
        margin-left: 7px;
        margin-top: 3px;
        font-size: 30px;
        
    }

    span {
        margin: 0;
        font-size: 12px;
    }

    

`
