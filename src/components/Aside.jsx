import { useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import { useId } from "../hooks/useId";
import { Context } from '../context';

//Icons
import { SiCivicrm as LogoIcon } from 'react-icons/si';
import { BsList as ListIcon } from 'react-icons/bs';
import { RiAddFill as AddIcon } from 'react-icons/ri';
import { IoIosSearch as SearchIcon } from 'react-icons/io';
import { FiMoon as MoonIcon } from 'react-icons/fi';
import { BsSun as SunIcon } from 'react-icons/bs';


export default function Aside() {
    const { modeDark, setModeDark } = useContext(Context)
    const ejemplo = false;
    const location = useLocation();
    const [generateId] = useId();

    const links = [
        {
            Elemento: ListIcon,
            link: "/crm/"
        },
        {
            Elemento: SearchIcon,
            link: "/crm/search"
        }, 
        {
            Elemento: AddIcon,
            link: "/crm/new"
        },
    ]

    function handleMode() {
        modeDark === "true"
            ? setModeDark("false")
            : setModeDark("true")
    }

    return (
        <div className='aside'>
            <div className="aside__logo">
                <LogoIcon className='aside__logo-component' />
            </div>

            <nav className="aside__actions">
                {
                    links.map(({ link, Elemento }) => {
                        return <Link
                            to={link}
                            className={`aside__box ${location.pathname === link && "aside__box--active"}`}
                            key={generateId(3)}>

                            <Elemento className='aside__icon' />
                        </Link>
                    }
                    )
                }
            </nav>

            <div className="aside__mode" onClick={handleMode}>
                {
                    modeDark === "true"
                        ? <MoonIcon />
                        : <SunIcon />
                }
            </div>
        </div>
    )
}