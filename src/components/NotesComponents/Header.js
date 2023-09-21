import React from "react";

const Header = ({ handleToggleDarkMode }) => {
    return(
        <div className="header">
            <h1>Poznámky</h1>
            
            <button onClick={()=> 
            handleToggleDarkMode(
                (previousDarkmode)=> !previousDarkmode
                    )
                }
                className="save">Dark Mode</button>
        </div>
    )
}

export default Header;