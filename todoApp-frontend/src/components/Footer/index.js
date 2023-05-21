import React from 'react'

const Footer = ({ doneTotal, total }) => {
    return (
        <div className='footer-wrap'>
            <div>DONE : {doneTotal}</div>
            <div>TOTAL : {total}</div>
        </div>
    )
}

export default Footer