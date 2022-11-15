import { useState, useEffect} from 'react'
import { useContext } from 'react'        
import { Context } from '../context'
import Formulario from "../components/Formulario" 
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Edit(){
    useDocumentTitle("Edit client")

    return (
        <Formulario type="edit"/>
    )
}