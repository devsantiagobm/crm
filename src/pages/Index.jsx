import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Cliente from '../components/Cliente'
import { Context } from '../context'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Index() {
    const { copyText, setCopyText } = useContext(Context)
    const { clientes } = useContext(Context)
    const location = useLocation()
    const clientesSize = clientes.length
    const clientesSizeMessage = clientesSize !== 1 ? `Currently you have ${clientesSize} clients` : `Currently you have 1 client` 
    useDocumentTitle("List of clients")

    useEffect(() => {
        if (Boolean(copyText)) {
            const input = document.querySelector('.index__input')
            input.select();
            document.execCommand('copy');
            input.blur()
        }
    }, [copyText])


    return (
        <div className='index'>

            <h1 className='index__title'>List of your clients</h1>
            <span className="index__subtitle">{clientesSizeMessage}</span>
            <div className="index__grid">
                {
                    clientes.map(cliente => (
                        <Cliente cliente={cliente} key={cliente.id} />
                    ))
                }
            </div>
            <input type="text" name="copy-to-clipboard" value={copyText} onChange={e => setCopyText(e.target.value)} className="index__input" />
        </div>
    )
}