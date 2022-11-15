import { useContext } from 'react'
import { useNavigate, useParams, useNavigation } from 'react-router-dom'
import { useId } from '../hooks/useId'
import { AiFillWarning as WarningIcon } from 'react-icons/ai'
import useValidation from '../hooks/useValidation'
import { Context } from '../context'


export default function Formulario({ type }) {
    const { clientes, setClientes } = useContext(Context)
    const parametros = useParams()
    const idCliente = parametros.id;
    const [generarId] = useId()
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        const [validateForm] = useValidation()
        const [formComplete, wrongData] = validateForm(e)

        if (!formComplete) {
            campoVacio(wrongData)
            return;
        }

        quitarClasesDeError()
        
        type === "new"
            ? handleCreate(e.currentTarget)
            : handleEdit(e.currentTarget)
    }

    function handleCreate(form) {
        const nuevoCliente = Object.fromEntries(new FormData(form))

        nuevoCliente.id = generarId(2)
        nuevoCliente.bg = Math.ceil(Math.random() * 8) // 8 are the images that are in assets/bgcards

        setClientes([nuevoCliente, ...clientes])
        form.reset()
        navigate("/crm/")
    }

    function handleEdit(form) {
        const clienteAEditar = clientes.find(cliente => cliente.id === idCliente)
        const indiceClienteAEditar = clientes.findIndex(cliente => cliente.id === idCliente)
        const nuevoClienteEditado = Object.entries(Object.fromEntries(new FormData(form)))

        for(let [key, value] of nuevoClienteEditado){ clienteAEditar[key] = value }

        const nuevosClientes = [...clientes]
        nuevosClientes[indiceClienteAEditar] = clienteAEditar
        
        setClientes(nuevosClientes)
        navigate("/crm/")
    }


    function generarInputs() {
        const clienteEditando = clientes.find(cliente => cliente.id === parametros.id)

        return inputs.map(input => {
            return (
                <Fieldset input={input} key={input.id} clienteEditando={clienteEditando} />
            )
        })

    }


    return (
        <form className='form__box' method='POST' noValidate onSubmit={handleSubmit}>
            <div className="form__text">
                <legend className="form__title"> {type === "new" ? "Create New Client" : "Edit your client"}</legend>
            </div>

            {
                generarInputs()
            }

            <input type="submit" value="Create client" className='form__submit' />
        </form>

    )
}

function Fieldset({ input, clienteEditando }) {
    const { name, message, placeholder } = input

    return (
        <fieldset data-type={name} className="form__fieldset ">
            <label htmlFor={name} className='form__label'>
                <input type={name !== "telephone" ? "text" : "number"} name={name} id={name} placeholder={placeholder} className='form__input' defaultValue={Boolean(clienteEditando) ? clienteEditando[name] : ""} />
                <WarningIcon className="form__icon" />
            </label>
            <span className="form__advice">{message}</span>
        </fieldset>
    )
}


const inputs = [
    {
        name: "name",
        message: "Name can not be empty",
        placeholder: "Name",
        id: 1
    },
    {
        name: "email",
        message: "Looks like this is not an email",
        placeholder: "Email address",
        id: 2
    },
    {
        name: "telephone",
        message: "Telephone can not be empty",
        placeholder: "Telephone",
        id: 4
    },
    {
        name: "company",
        message: "Company can not be empty",
        placeholder: "Company Name",
        id: 3
    },

    {
        name: "notes",
        message: "Notes can not be empty",
        placeholder: "Notes",
        id: 5
    }
]

function campoVacio(data) {
    const fieldsets = document.querySelectorAll('.form__fieldset ')

    for (const campo of fieldsets) {
        const type = campo.dataset.type

        data.includes(type)
            ? campo.classList.add('form__fieldset--error')
            : campo.classList.remove('form__fieldset--error')

    }
}

function quitarClasesDeError() {
    for (const campo of document.querySelectorAll('.form__fieldset')) {
        campo.classList.remove('form__fieldset--error')
    }
}
