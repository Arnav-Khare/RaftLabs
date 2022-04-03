import React from "react";
import styled from "styled-components";


const ButtonWrapper = styled.button`
    width: ${({ width }) => typeof width === "string" ? width : `${width}%`};
    border: none;
    outline: none;
    color: ${({outline}) => outline ? `#3E5B60` : `#fff`};
    padding: 4px 2em;
    font-size:18px;
    font-weight:500;
    border:2px solid #3C5A5F;
    border-radius:6px;
    background-color:${({outline}) => outline ? `#fff` : `#3C5A5F`};
    cursor:pointer;
    transition: all 100ms ease;
    &:hover{
        background-color:#3C5A5F;
        color:#fff;
    }
    &:focus{
        outline: none;
    }

`;
export function Button(props){
       return <ButtonWrapper {...props}/>
}