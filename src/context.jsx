import { createContext, useState, useEffect } from "react";
const Context = createContext();

function ContextProvider({ children }) {
    const clientesLocalStorage = JSON.parse(localStorage.getItem("clientes")) || []
    const modeLocalStorage = localStorage.getItem("mode-dark") || "false"

    const [clientes, setClientes] = useState(clientesLocalStorage)
    const [copyText, setCopyText] = useState("")
    const [modeDark, setModeDark] = useState( modeLocalStorage)

    useEffect(() => {
        localStorage.setItem("clientes", JSON.stringify(clientes))
        animarGridClientes()
    }, [clientes])

    useEffect(() => {
        localStorage.setItem("mode-dark", modeDark)
        const root = document.querySelector('html')


        root.setAttribute("dark", modeDark)
    }, [modeDark])

    const estados = {
        clientes,
        setClientes,
        copyText,
        setCopyText,
        modeDark, 
        setModeDark
    }

    return (
        <Context.Provider value={estados}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider }

function animarGridClientes() {
    const $clientes = document.querySelector('.index__grid')

    if ($clientes) {
        $clientes.classList.add('index__grid--animation')
        setTimeout(() => $clientes.classList.remove('index__grid--animation'), 300);
    }

}