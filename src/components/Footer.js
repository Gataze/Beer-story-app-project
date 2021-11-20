import styled from "styled-components";


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

    padding: 30px;
    color: white;
    background-color: #233237;
    text-align: center
`

const Test = styled.div`
    position: absolute;
    text-align: left;
    bottom: 15px;
    span {
        margin-right: 20px;
    }
`