import Formulario from "../components/Formulario"
import { useDocumentTitle } from "../hooks/useDocumentTitle"

export default function New() {
    useDocumentTitle("Create client")

    return (
        <Formulario type="new"/>
    )
}