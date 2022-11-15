import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import Index from "./pages/Index";
import New from "./pages/New";
import Search from "./pages/Search";
import Edit from "./pages/Edit"

const router = createBrowserRouter([
    {
        path: "/crm/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Index />
            },
            {
                path: "/crm/new",
                element: <New />
            },
            {
                path: "/crm/search",
                element: <Search />
            },
            {
                path: "/crm/edit/:id",
                element: <Edit/>
            }

        ]
    },
])

export default router

//

// en el path no es que busque un html en ese directorio para que lo muestre. Lo que hace es que, cuando se vaya a esa url se muestre el contenido que está en element