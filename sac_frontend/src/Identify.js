import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Identify()
{
    const navigate = useNavigate();
    window.sessionStorage.setItem("token", "")
    window.sessionStorage.setItem("subject", "")
    window.sessionStorage.setItem("issuer", "")
    const [username, setUsername] = useState();

    const handleChange = (event) =>{
        setUsername(event.target.value)
    }

    const handleConnection = () => {
        axios.get("http://localhost:5000/checkUserRole", {
            params : {
                username: username
            }
        })
        .then((response) => {
            window.sessionStorage.setItem("token", response.data)
            window.sessionStorage.setItem("subject", username)
            window.sessionStorage.setItem("issuer", "Comp2024")
            navigate("/Unprotected");
        })
        .catch((error) => {
            alert(error)
            window.sessionStorage.setItem("token", "")
            window.sessionStorage.setItem("subject", "")
            window.sessionStorage.setItem("issuer", "")
            
        })
    }
    return(
        <div className="container">
            <form>
                <input type="text" onChange={handleChange}></input>  
            </form>
            <button onClick={handleConnection}>Connect</button>
        </div>
    )
}

