import React from 'react'

export default function NavItem(props){

    if(props.render){
        return(
            <li className="nav-item">
                <a className="nav-link" onClick={props.onClick} href={props.href}>{props.label}</a>
            </li>
        )
    }
    
    return(
        false
    )

}