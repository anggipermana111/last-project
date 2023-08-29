import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { AllContext } from '../App'

const Main = () => {
    const {theme} = useContext(AllContext)
    return (
        <>
            <Header />
            <main className={`movie-${theme} text-${theme}`}>
                <Outlet />
            </main>
            <Footer/>
        </>
    )
}

export default Main