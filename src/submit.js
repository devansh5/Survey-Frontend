import React from 'react'
import { Link } from 'react-router-dom'

export default function submit() {
    return (
        <div className="submit-page" >
            <h1>Thank you!</h1>
            <p>for completing the survey</p>
            <Link to="/" > fill another form</Link>
        </div>
    )
}
