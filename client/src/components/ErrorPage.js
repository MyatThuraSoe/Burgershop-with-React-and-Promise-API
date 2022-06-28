import React from "react";
import { Link } from 'react-router-dom'
export function ErrorPage() {
    const style = {
        height: '90vh',
        textAlign: 'center'
    };
    const linkstyle = {
        fontSize: '1.2rem',
        fontWeight: '600'
    }
    return (
        <div style={style}>Error! Page not found<br/>
        Go back to the <Link to={'/'} style={linkstyle}>  Home Page </Link>
        </div>
    );
    
}