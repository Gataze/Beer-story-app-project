import { useSelector } from "react-redux";

const UserPage = () => {

    const userCreds = useSelector(state => state.entities.auth.user)

    
    return ( 
        <section>
            <h2>Panel użytkownika</h2>
            <article>
                <h2>Dane</h2>
                <p>Użytkownik: {userCreds?.username}</p>
                <p>Email: {userCreds?.email}</p>
            </article>
        </section>

     );
}
 
export default UserPage;