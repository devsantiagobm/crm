import { useState, useEffect, useContext } from 'react'
import { Context } from '../context'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Cliente from '../components/Cliente'


export default function Search() {
    const { clientes } = useContext(Context)
    const [clientesFiltrados, setClientesFiltrados] = useState(clientes)
    useDocumentTitle("Search client")

    useEffect(() => {
        animarGridClientes()
    }, [clientesFiltrados])


    function handleSubmit(e) {
        e.preventDefault()
        const nombre = e.currentTarget.search.value
        const nuevosClientesFiltrados = clientes.filter(cliente => cliente.name.toLowerCase().includes(nombre.toLowerCase()))
        setClientesFiltrados(nuevosClientesFiltrados)
    }

    return (
        <div className='search'>
            <div className="search__box">
                <h1 className="search__title">Search a client</h1>
                <form action="#" className='search__form' onSubmit={handleSubmit}>
                    <input type="text" name='search' id='search' className='search__input' placeholder='Search a client by name' />
                    <input type="submit" value="Search" className='search__submit' />
                </form>
            </div>

            <div className="search__grid">
                {
                    clientesFiltrados.map(cliente => (
                        <Cliente cliente={cliente} key={cliente.id} />
                    ))
                }
            </div>

        </div>
    )
}

function animarGridClientes() {
    const $clientes = document.querySelector('.search__grid')

    if ($clientes) {
        $clientes.classList.add('index__grid--animation')
        setTimeout(() => $clientes.classList.remove('index__grid--animation'), 300);
    }

}