import React from 'react';
import "./Button.css";

const Button = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button {...props} className={`button ${props.className}`} />
    );
}

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
}

export default Button;