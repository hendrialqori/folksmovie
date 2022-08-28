import { useEffect, useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { VotingLoad } from '../../component/loadVoting'
import API_KEY from '../../constant/key'
import fetchError from '../../utils/error'
import storeGenres from '../../constant/genres'
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import './detail.css'


export default function Detail (){
  const votingLocal = localStorage.getItem('voting') ? JSON.parse(localStorage.getItem('voting')) : []
  const session_guest_id = localStorage.getItem('session_guest_id')

  const params = useParams()
  const [detailMovie, setDetailMovie] = useState({})
  const [voting, setVote] = useState(votingLocal)
  const [valueVote, setValueVote] = useState(1)
  const [triggerVote, setTriggerVote] = useState(false)
  const [triggerVotingLoad, setTriggerVotingLoad] = useState(false)

  const { title, vote_average, vote_count, release_date, backdrop_path, poster_path, genres, original_language, overview } = detailMovie

  // variable " id " here base from const { id } = useParams()
  const findIdFromVotingLc = voting.find(voted => voted?.id === params?.id)

  const getGenre = (ids) => {
    const choose = storeGenres?.find(genre => genre?.id === ids)
    const { name } = choose
    return name
  }

  useLayoutEffect(()=> {
    setVote(prev => votingLocal)
  }, [triggerVote])

  useEffect(()=> {
    ( async ()=>{
        try {
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${params?.id}?api_key=${API_KEY}&language=id-ID`)
            const response = await request.data
            setDetailMovie(response)
        } catch (error) {
            fetchError(error?.message, 'Error at line 34 Detail directory index file')
        }
    })()
  }, [])
  
  const handleVote = async() => {
    setTriggerVotingLoad(true)

    // variable " id " here base from const { id } = useParams()
    const findIdVote = voting?.find(vote => vote?.id === params?.id)
    const newVotingList = !findIdVote ? [ ...voting ,{ id: params?.id , voted: true }] : voting?.map(voted => voted.id === params?.id ? { id: params?.id, voted: true } : voted  )

    try {
        // const request = await axios.post(, {
        const request =  await axios({
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            url: `https://api.themoviedb.org/3/movie/${params?.id}/rating?api_key=${API_KEY}&guest_session_id=${session_guest_id}`,
            data: { value : valueVote }
         }) 
        if(request.status) {

            localStorage.setItem('voting', JSON.stringify(newVotingList)) 
            // Trigger for reload without refresh the page
            setTriggerVote(prev => !prev)
            setTriggerVotingLoad(false)
            toast.success('Terima kasih telah mem-voting!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    } catch (error) {
        setTriggerVotingLoad(false)

        // Trigger for reload without refresh the page
        setTriggerVote(prev => !prev)

        throw new fetchError(error?.message, 'Error at line 59 Directory detail index file')
    }
  }

  const cencelVote = async () => {
    setTriggerVotingLoad(true)

    // variable " id " here base from const { id } = useParams()
    const editVotingList = voting.map(vote => vote?.id === params?.id ? { id: params?.id , voted: false } : vote )

    try {
        const request =  await axios.delete(`https://api.themoviedb.org/3/movie/${params?.id}/rating?api_key=${API_KEY}&guest_session_id=${session_guest_id}`)
        if(request.status === 200) {
            localStorage.setItem('voting', JSON.stringify(editVotingList)) 
            setTriggerVotingLoad(false)

            // Trigger for reload without refresh the page
            setTriggerVote(prev => !prev)
        }
    } catch (error) {
        setTriggerVotingLoad(false)

        // Trigger for reload without refresh the page
        setTriggerVote(prev => !prev)

        throw new fetchError(error?.message, 'Error at line 115 Directory detail index file')
    }
  }

  return (
    <section style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        backgroundSize: 'cover'
    }} className='flex justify-center items-center' aria-label="detail-wrapper">
        <div className='py-5 md:py-20 md:h-[100vh]' aria-label='detail-container'>
            <article className='flex flex-col md:flex-row gap-3'>
                <section className='w-max mx-auto'>
                    <LazyLoadImage 
                        className="rounded-[2px]"
                        src={"https://image.tmdb.org/t/p/w200"+poster_path}
                        alt="avatar-film"
                        effect="blur"
                       />
                </section>
                <section className='text-white w-full md:w-8/12 -translate-y-2'>
                    <h1 className='font-bold text-[1.6rem]'>{title} ({release_date?.split('-')[0]})</h1>
                    <div className='flex flex-col md:flex-row gap-1 text-md font-light' aria-label='movie-information'>
                        <p className=''>{new Date(release_date).toDateString()} ({original_language}) &#8226;</p>
                        <div className='flex gap-1'>
                            {
                                genres?.map(obj => (
                                    <span key={obj.id}>| {getGenre(obj.id)}</span>
                                ))
                            }
                        </div>
                    </div>
                    <div className='flex gap-4 items-center my-4' aria-label='information'>
                        <span className='flex items-center gap-1'>
                            <AiFillStar className='text-yellow-500' />
                            <p className='text-sm font-bold'>{vote_average}</p>
                        </span>
                        <span className='flex items-center gap-2'>
                            <BsFillPersonCheckFill className='text-gray-400' />
                            <p className='text-sm font-bold'>{vote_count}</p>
                        </span>
                        <div className='flex gap-1 items-center' aria-label='voting'>
                            <div className='flex justify-center items-center gap-1'>
                               {
                                !findIdFromVotingLc?.id || !findIdFromVotingLc?.voted ?
                                <>
                                    <select value={valueVote} onChange={e => setValueVote(e.target.value)} className='text-black px-[.8px] rounded outline-none bg-yellow-300 font-light' name="" id="">
                                       {
                                        Array.from({ length: 10 }).map((_, i) => (
                                            <option key={i} value={i + 1} >
                                                {i + 1}
                                            </option>
                                        ))
                                       }
                                    </select>
                                    <button onClick={()=> handleVote()} className='border-[1px] text-sm px-1 py-[.3px] border-yellow-300  rounded-sm'>Rated</button>
                                </>
                                  :
                                <button onClick={()=> cencelVote()} className='border-[1px] text-sm px-1 py-[.5px] border-yellow-300  rounded-sm'>Cencel rated</button>
                               }
                            </div>
                             { triggerVotingLoad && 
                                <>
                                    <VotingLoad /> 
                                </>
                             } 
                        </div>
                        </div>
                        <div className='' aria-label='overview'>
                            <h2 className='font-bold'>Kilas singkat</h2>
                            <p className='text-md font-light'>{!overview?.length ? '-' : overview}</p>
                            <Link className='flex items-center text-white text-sm font-light gap-2 mt-2 border-[1px] w-max mr-0 ml-auto p-1 border-yellow-300 rounded-sm' to='/'>
                                <FaLongArrowAltLeft className='text-yellow-300' />
                                Ke halaman utama
                            </Link>
                        </div>
                </section>
            </article>
        </div>
        <ToastContainer />
    </section>
  )
}