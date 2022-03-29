import axios from 'axios'
import { useState , useEffect , createContext } from 'react'

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) => {

    const [pagina , setPagina] = useState(1)
    const [totalNoticias , setTotalNoticias] = useState(0)
    const [categoria , setCategoria] = useState('general')
    const [noticias  ,setNoticias] = useState([])

    const handleChangeCategoria = (e) => {
        setCategoria(e.target.value)
    }

    useEffect(() => {
        const consultarApi = async () => {
           try {

             const apiKey = '5675f1ddaf44483aae77e295b0e7501c'
             const url = `https://newsapi.org/v2/top-headlines?country=ar&category=${categoria}&page=2&apiKey=${apiKey}`
             const { data } = await axios(url)
             setNoticias(data.articles);
             setTotalNoticias(data.totalResults)
             setPagina(1)

           } catch (error) {
             console.log(error);
           }
        }
        consultarApi()
    }, [categoria])


    useEffect(() => {
        const consultarApi = async () => {
           try {

             const apiKey = '5675f1ddaf44483aae77e295b0e7501c'
             const url = `https://newsapi.org/v2/top-headlines?country=ar&category=${categoria}&page=${pagina}&apiKey=${apiKey}`
             const { data } = await axios(url)
             setNoticias(data.articles);
             setTotalNoticias(data.totalResults)

           } catch (error) {
             console.log(error);
           }
        }
        consultarApi()
    }, [pagina])



    const handleChangePagina = (e , valor) => {
       setPagina(valor)
    }
    

  return (
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                noticias,
                totalNoticias,
                handleChangePagina,
                pagina
            }}
        >
            {children}
        </NoticiasContext.Provider>
  )
}

export {
    NoticiasProvider
} 

export default NoticiasContext