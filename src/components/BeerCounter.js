import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer } from '@fortawesome/free-solid-svg-icons';

const BeerCounter = () => {


    


    return ( 
        <BeerCounterContainer>
            <Container>
                <FontAwesomeIcon icon={faBeer} />
                <GiveBeer>Daj piwo</GiveBeer>
            </Container>
                
            
        </BeerCounterContainer>
     );
}
 
export default BeerCounter;


const BeerCounterContainer = styled.div`
    width: 50px;
    height: 50px;
`


const Container = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-items: center;
    width: 50px;
    height: 50px;
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

`

const GiveBeer = styled.p`
    margin: 0;
    font-size: 11px;

`
    