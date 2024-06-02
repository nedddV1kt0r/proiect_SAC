import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Unprotected(){

    const [data, setData] = useState();
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get("http://localhost:5000/unprotectedResource", {
           
        })
        .then((response) => {
            setData(response.data);
            console.log(window.sessionStorage.getItem('token'))
        })
        .catch((error) => {
        })
    },[]);

    const customers = data?.map((customer,index) =>{
        return(
            <tr>
                <td>{customer.name}</td>
            </tr>
        )
    })

    const handleProtected = () => {
        navigate("/Protected");
    }

    const handleLogout = () => {

        const token = window.sessionStorage.getItem('token');
 

        axios.post("http://localhost:5000/blacklistToken", {}, {
            headers: {
              'Authorization': `Bearer ${token}`,       
            }
          })
        .then((response) => {
            if(response.data === "Blacklisted!" || response.data === "Not Blacklisted!")
                navigate("/")
        })
        .catch((error) => {
            
          alert(error);
        })
    }
    return(
        <div className="container">
            <p>Unprotected</p>
            <table>
                {customers}
            </table>
            <button onClick = {handleProtected}>Show protected</button>
            <button onClick = {handleLogout}>Logout</button>
        </div>
    )
}