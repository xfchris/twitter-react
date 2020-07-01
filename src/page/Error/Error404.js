import React from 'react'
import BasicLayout from '../../layout/BasicLayout'
import './Error404.scss'
import { Link } from 'react-router-dom'

export default function Error404() {
    return (
        <div className="error404">
            <h1>Error 404</h1>
            <Link to="/">Volver al inicio</Link>
        </div>
    )
}
