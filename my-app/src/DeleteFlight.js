
import React from 'react'
import axios from 'axios'

function DeleteFlight(props) {
    return (
        <div>
           
            <button onClick={(event) => axios.post('http://localhost:8080/deleteFlights', {
        _id: props.idd,
        
      })
      .then(function (response) {
        console.log("xxx");
      })}>Yes</button>


        </div>
    )
}

export default DeleteFlight


