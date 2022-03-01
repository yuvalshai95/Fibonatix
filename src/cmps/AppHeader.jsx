import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

// Services
import { storageService } from '../services/async-storage.service'
import logo from '../assets/imgs/graduation-hat.svg'
// Icons
import { GiHamburgerMenu } from 'react-icons/gi';


export function AppHeader() {
    const [isMenuOpen, setMenuState] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleMenu = () => {
        setMenuState(!isMenuOpen)
    }

    useEffect(() => {
        loadTheme()
    }, [])

    useEffect(() => {
        isDarkMode ?
            document.body.classList.add('dark-mode') :
            document.body.classList.remove('dark-mode')

        isDarkMode ?
            storageService.saveToStorage('theme', 'dark-mode') :
            storageService.saveToStorage('theme', 'light-mode')

    }, [isDarkMode])

    const loadTheme = () => {
        const theme = storageService.loadFromStorage('theme') || 'light-mode'
        theme === 'dark-mode' ? setIsDarkMode(true) : setIsDarkMode(false)
    }

    const toggleDarkMode = () => {
        setIsDarkMode(prevDarkMode => !prevDarkMode)
    }

    return (
        <header className='app-header'>
            <div className={`screen-overlay ${(isMenuOpen) ? 'open' : ''}`} onClick={toggleMenu}>
            </div>

            <section className='header-content main-layout'>
                <div className="logo-wrapper flex">
                    <Link className="logo" to="/"><img src={logo} alt="logo" /></Link>
                    <p className="logo">Students</p>
                </div>

                <div className="header-right flex">
                    {/* Dark mode toggle */}
                    <div onClick={toggleDarkMode} className="toggle-dark-mode">
                        <div className="toggle-track">
                            <div className={`dark-mode-icon-off ${isDarkMode ? 'dark-on' : 'dark-off'}`}>
                                <span className="icon-off flex align-center justify-center">🌜</span>
                            </div>
                            <div className={`dark-mode-icon-on ${isDarkMode ? 'dark-on' : 'dark-off'}`}>
                                <span className="icon-on flex align-center justify-center">🌞</span>
                            </div>
                            <div className={`toggle-track-thumb ${isDarkMode ? 'dark-on' : 'dark-off'}`}></div>
                        </div>
                    </div>

                    <nav className='nav-container'>
                        <ul className={`nav-links clean-list ${(isMenuOpen) ? 'open' : ''}`}>
                            <NavLink to="/"> <li>Home</li></NavLink>
                        </ul>
                    </nav>

                    <button className="hamburger-btn" onClick={toggleMenu}>
                        <GiHamburgerMenu className="hamburger-icon" />
                    </button>
                </div>
            </section>
        </header>
    );
}
