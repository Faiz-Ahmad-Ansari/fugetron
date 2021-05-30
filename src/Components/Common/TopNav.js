import React from 'react';
import { Link } from "react-router-dom";

const TopNav = () => {
    return ( 
        <div className='row p-0 m-0 topNav'>
            <div className='col-md-6 mr-0 p-0 text-secondary text-left'>
                <div className='m-2 ml-0 task'>Task</div>
            </div>
            <div className='col-md-6 p-0 text-right'>
            <Link to="/"><div className='m-2  home'>Home</div></Link>
                
            </div>
        </div>
     );
}
 
export default TopNav;