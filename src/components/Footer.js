import styled from "styled-components";

// Footer component of the page
const Footer = () => {


    return ( 
        <FooterStyles>
            
            <FooterContainer>
                <Test>
                    <p>Wersja testowa</p>
                    <p>Dane do logowania:</p>
                    <span>email: 3cf2zsnz@freeml.net</span>
                    <span>hasło: test1234 </span>
                </Test>
                
                <Copyrights>
                    <h4>All Rights Reserved</h4>
                    <p>Marcin Brzozowski 2021</p>
                </Copyrights>
                </FooterContainer>
        </FooterStyles>
     );
}
 
export default Footer;


const FooterStyles = styled.footer`
    
    background-color: #233237;
    color: white;
    text-align: center
`

const FooterContainer = styled.div`
    display: flex;  
    max-width: 1040px;
    flex-flow: column;
    margin: 0px auto;
    padding: 20px 0;
    align-items: center;
    @media(min-width: 576px){
        flex-flow: row;
        align-items: flex-end;
    }
`

const Test = styled.div`
    text-align: center;
    
    @media(min-width: 576px){
        text-align: left;
        margin-left: 20px;
    }

    span {
        margin-right: 5px;
    }
    
`

const Copyrights = styled.div`
    text-align: center;
    margin: 20px 0 0 0;
    @media(min-width: 576px){
        text-align: right;
        margin-left: auto;
        margin-right: 20px;
    }
`