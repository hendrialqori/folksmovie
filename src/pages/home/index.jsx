import { useEffect, useMemo, useState, useCallback } from 'react'
import fetchError from '../../utils/error'
import { LoadBtn } from '../../component/loadBtn'
import { Card } from '../../component/card'
import { Modal } from '../../component/seachModal'
import API_KEY from '../../constant/key'
import axios from 'axios'
import './home.css'


export default function Home (){
  const [movies, setMovies] = useState([])
  const [moviesSearch, setMoviesSeach ] = useState([])
  const [keyword, setKeyword] = useState('')
  const [loadMovie, setLoadMovie] = useState(false) 
  const [loadSearch, setLoadSeach] = useState(false)
  const [isShow, setShow] = useState(false)
  const [page, setPage] = useState(1)

  const allMovie = useMemo(()=> {
    return movies
  }, [movies])

  const searchResultMovie = useMemo(()=> {
    return moviesSearch
  }, [moviesSearch])

  const showCallback = useCallback(()=> {
    setKeyword('')
    setShow(false)
  }, [])

  useEffect(()=> {
    ( async ()=> {
      setLoadMovie(true)
      try {
        const request = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=id-ID&page=${page}&region=ID`)
        const response = await request.data
        setMovies(prev => [...prev, ...response.results])
        setLoadMovie(false)
      } catch (error) {
        setLoadMovie(false)
        throw new fetchError(error?.message, 'Error line 23, Home directory index file')
      }
    })()
  }, [page])


  const handleSeach = async (e) => {
    e.preventDefault()

    setShow(true)
    setLoadSeach(true)

    try {
      const request = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=id-ID&query=${keyword}&page=1&include_adult=false`)
      const response = await request.data
      setMoviesSeach(response.results)
      setLoadSeach(false)

    } catch (error) {
      setLoadSeach(false)
      throw new fetchError(error?.message, 'Error line 50, Home directory index file')
    }
  }

  return (
    <main className={allMovie.length < 1 ? 'h-[100vh]' : 'h-auto'} aria-label='main-wrapper'> 
      <Modal
       isShow={isShow}
       isLoad={loadSearch}
       handleShow={showCallback}
       keyWord={keyword}
       moviesSearch={searchResultMovie}

      />
      <section className='text-white py-[50px]' aria-label='__container'>
        <header className='text-center'>
          <h1 className='font-bold text-[2rem] tracking-[.8px]'>WELCOME FOLKS!</h1>
          <p className='font-light text-lg mb-5'>Selamat datang di <span className='font-bold text-rose-500'>THE FOLKS MOVIE</span> nikmati pengalaman menonton yang luar biasa di sini.</p>
          <form onSubmit={handleSeach} className='flex flex-col gap-3 items-center'>
            <input 
             type="text" 
             value={keyword}
             onChange={e => setKeyword(e.target.value)}
             className='w-full rounded-[2px] bg-transparent p-3 border-[1px] border-gray-500 outline-none font-light text-lg'
             placeholder='cth: Thor'
             required
            />
            <button className='bg-rose-600 hover:bg-rose-500 w-[80px] p-2 rounded-[2px] flex justify-center items-center' type='submit'>
                <p className='text-sm text-white'>CARI</p>  
            </button>
          </form>
        </header>

        <section className='mt-14'>
          <div className='mt-5 flex gap-x-3 justify-center gap-y-10 flex-wrap'>
            {
              allMovie.map((obj, i) => (
                <Card key={i} {...obj} />
              ))
            }
          </div>
          <button onClick={()=> setPage(prev => prev + 1)} className='bg-rose-600 hover:bg-rose-500 w-full p-2 rounded-[2px] flex justify-center items-center mt-10'>
              {
                loadMovie ? <LoadBtn /> :  <p className='text-white font-light'>Unduh selengkapnya</p>
              }
          </button>
        </section>
      </section>
    </main>
  )
} 