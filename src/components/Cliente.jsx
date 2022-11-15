import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../context"
import { MdContentCopy as CopyIcon } from "react-icons/md"
import { FiEdit2 as EditIcon } from "react-icons/fi"
import { AiOutlineDelete as DeleteIcon } from "react-icons/ai"

export default function Cliente({ cliente }) {

    const { company, email, name, notes, telephone, bg, id } = cliente
    return (
        <div className='client'>

            <div className="client__bg">
                <div className="client__name">{name}</div>
                {/* <img src={`../src/assets/bg-${bg}.png`} alt="background image" className="client__image" /> dev */ } 
                <img src={`./assets/bg-${bg}.png`} alt="background image" className="client__image" /* build *//> 
            </div>

            <div className="client__data">

                <Actions name={"Email"} value={email} />
                <Actions name={"Telephone"} value={telephone} />
                <Flex name={"Company"} value={company} />
                <Flex name={"Notes"} value={notes} />

            </div>


            <Buttons id={id} />


        </div>
    )
}


function Actions({ name, value }) {
    const { setCopyText } = useContext(Context)

    function handleCopy(e) {
        setCopyText(e.currentTarget.dataset.copy)
    }

    return (
        <div className="client__action">
            <div className="client__flex">
                <span className='client__semibold'>{name}:</span>
                <span className="client__value">{value}</span>
            </div>
            <CopyIcon className='client__icon' data-copy={value} onClick={handleCopy} />
        </div>
    )
}

function Flex({ name, value }) {
    return (
        <div className="client__flex">
            <span className='client__semibold' >{name}:</span>
            <span className="client__information">{value}</span>
        </div>

    )
}

function Buttons({ id }) {
    const { clientes, setClientes } = useContext(Context)

    function handleDelete() {
        const clientesFiltrados = clientes.filter(cliente => cliente.id !== id)
        setClientes(clientesFiltrados)
    }
    
    return (
        <div className="client__buttons">
            <Link to={`/crm/edit/${id}`} className="client__button client__button--edit">
                <EditIcon />
            </Link>
            <button className="client__button client__button--delete" onClick={handleDelete}>
                <DeleteIcon />
            </button>
        </div>
    )
}
