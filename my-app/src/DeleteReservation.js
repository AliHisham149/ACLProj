
import React from 'react'
import axios from 'axios'

function DeleteReservation(props) {
    return (
        <div>
           
            <button onClick={(event) => axios.post('http://localhost:8080/cancelReservation', {
        _id: props.idd,
        
      })
      .then(function (response) {
        // console.log("xxx");
      })}>Yes</button>


        </div>
    )
}

export default DeleteReservation


