import React from 'react';
import { Link } from 'react-router-dom';


function fourZeroFour(props) {
    return (
        <div className='notfound'>
            <strong>404 Error</strong>
            <p>Sorry the page you are looking for is not found</p>
            <Link to='/'>Go Back</Link>
        </div>
    )
}

export default fourZeroFour