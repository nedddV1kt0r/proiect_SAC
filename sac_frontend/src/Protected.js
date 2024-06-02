import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(){

    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(()=>{

        const token =  window.sessionStorage.getItem("token");
        const subject =  window.sessionStorage.getItem("subject");
        const issuer = window.sessionStorage.getItem("issuer");
        axios.get("http://localhost:5000/protectedResource", {

        headers: {
            'Authorization': `Bearer ${token} ${subject} ${issuer}`
          }
           
        })
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            
            navigate("/Unprotected");
            alert("Access forbiden!");
        })
    },[]);

    const customers = data?.map((customer,index) =>{
        return(
            <tr>    
                <td>{customer.customer_id}</td>
                <td>{customer.name}</td>
                <td>{customer.balance}</td>
            </tr>
        
        )
    })

    return(
        <div className="container">
            <p>Protected</p>
            <table>
                {customers}
            </table>
            
        </div>
    )
}