import styled from "styled-components";

// Footer component of the page
const Footer = () => {


    return ( 
        <FooterStyles>
            
            <Test>
                <p>Wersja testowa</p>
                <p>Dane do logowania:</p>
                <span>email: 3cf2zsnz@freeml.net</span>
                <span>hasło: test1234 </span>
            </Test>
            
            <section>
                <h4>@All Rights Reserved</h4>
                <p>Marcin Brzozowski 2021</p>
            </section>
            
        </FooterStyles>
     );
}
 
export default Footer;


const FooterStyles = styled.footer`
    position: relative;
    padding: 30px;
    background-color: #233237;
    color: white;
    text-align: center
`

const Test = styled.div`
    position: absolute;
    bottom: 15px;
    text-align: left;

    span {
        margin-right: 20px;
    }
`