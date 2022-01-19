import React from 'react'
import flight from "./images/flight.png"
function Layout(props) {
    return (
        <div>

            <div
                    id='intro-example'
                    className='p-5 text-center bg-image'
                    style={{
                        background: `url(${flight})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", height: window.screen.height, width: window.screen.width
                    }}
                   

                >
                     {props.component}
                    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', marginTop: 100, height: 600, width: 1450 }}> </div>


                </div>
            
        </div>
    )
}

export default Layout
