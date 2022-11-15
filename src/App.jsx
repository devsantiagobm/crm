import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './context'
import router from "./router"


function App() {
    return (
        <ContextProvider>
            <RouterProvider router={router} >
                <div className="App">
                </div>
            </RouterProvider >
        </ContextProvider>
    )
}

export default App
