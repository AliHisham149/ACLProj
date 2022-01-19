import React from 'react'
function Layout(props) {
    return (
        <div>

            <div
                    id='intro-example'
                    className='p-5 text-center bg-image'
                   
                   

                >
                     {props.component}
                    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', marginTop: 100, height: 600, width: 1450 }}> </div>


                </div>
            
        </div>
    )
}

export default Layout
