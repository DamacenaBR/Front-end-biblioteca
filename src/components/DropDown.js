import React from 'react'
import {NavDropdown} from 'react-bootstrap'

export default function DropDown({render, ...props}){
    
    if(render){
        return (
            <NavDropdown title={props.titulo} id="nav-dropdown">
                {props.children}
            </NavDropdown>
        )
    }
    else{
        return false
    }
}