import React from 'react'
import {NavDropdown} from 'react-bootstrap'

export default function DropDownItem(props){
    
    
    return (
        <NavDropdown.Item href={props.href}>{props.label}</NavDropdown.Item>
    )

}