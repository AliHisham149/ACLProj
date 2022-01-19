import React from 'react'

function FooterLayout() {
    return (
        <div>
            <BottomNavigation sx={{ width: window.screen.width, height: 70, marginLeft: 0, marginTop: -5 }} value={bNavBar} onChange={handleChangeBNavBar}>
                    <BottomNavigationAction
                        label="Send us an email"
                        value="Send us an email"
                        icon={<Mail />}
                    />

                    <BottomNavigationAction
                        label="Find us"
                        value="Find us"
                        icon={<LocationOnIcon />}
                    />

                    <BottomNavigationAction
                        label="Contact Us"
                        value="Contact Us"
                        icon={<PhoneInTalkIcon />} />
                    <BottomNavigationAction
                        label=" Language"
                        value=" Language"
                        icon={<LanguageIcon />}
                    />
                </BottomNavigation>

            
        </div>
    )
}

export default FooterLayout
