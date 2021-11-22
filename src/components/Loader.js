import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";


// Loader component that makes loading indicator visible if redux-store loading value is true.
const Loader = () => {

    // Loading value selectors: auth is true when user awaits for authentication, article loading is true when article is adding/getting/updateing or deleting.
    const authLoading = useSelector(state => state.entities.auth.loading);
    const articleLoading = useSelector(state => state.entities.beers.loading);

    // True/false values should not be sended by props to styled components. 
    // Official sollution: In this case we should send 1/0 instead. "+" before true/false value will change this value to 1/0.
    // If we will not change true false into 1/0 warning msg will be displayed in the console (Warning: Received `false` for a non-boolean attribute `loading`.)
    const loading =  +articleLoading? +articleLoading : +authLoading
    

    return ( 

        <LoaderContainer loading={loading}>
            <AppLoader></AppLoader>
        </LoaderContainer>
    
     );
}
 

export default Loader;

const spin = keyframes`
    0% {
 transform: rotate(0deg);
 }

  100% {
 transform: rotate(360deg);
 }
`


const LoaderContainer = styled.section`
    display: ${({loading}) => loading? 'flex' : 'none'};
    position: fixed;
    z-index: 1;
    top: 0;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.0);
`


const AppLoader = styled.div`
    width: 20px;
    height: 20px;
    animation: ${spin} 2s linear infinite;
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
`


