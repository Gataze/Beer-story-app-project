import styled from "styled-components";


const Footer = () => {


    return ( 
        <FooterStyles>
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
