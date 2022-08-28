import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { SearchLoad } from './loadSearch'
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../styles/modal.css'

export const Modal = ({ isShow, isLoad, handleShow, keyWord, moviesSearch }) => {
  return (
    <section className={isShow ? 'show__modal' : ' hide__modal show__modal'} aria-label="seach-result-modal">
        <div className='relative overflow-auto' aria-label='modal-container'>
            <button onClick={()=> handleShow()} className='absolute border-[2px] right-4 top-4 rounded-full p-1 z-[50]'>
                <IoMdClose className='text-white text-2xl' />
            </button>
            <div className='text-white px-3 py-5 '>
                <h3 className='text-2xl mt-3 font-light text-center'>Pencarian "{keyWord}"</h3>
                <div className='mt-5 flex justify-center flex-wrap gap-5' aria-label='movie-container'>
                {
                  isLoad ? <SearchLoad /> : 
                  moviesSearch?.map((obj,i) => (
                    <figure key={i} className='flex gap-2 w-[220px] rounded-md border-[1px] border-gray-600'>
                      <header>
                        <LazyLoadImage 
                          className='w-20 h-32 object-cover rounded-md' 
                          src={"https://image.tmdb.org/t/p/w200"+ obj.poster_path} 
                          alt="poster-movie" 
                          effect="blur"
                        />
                      </header>
                      <section className='flex flex-col justify-between p-1'>
                        <div aria-label='title'>
                          <h1 className='font-light leading-5'>{obj.title}</h1>
                          <h2 className='font-bold'>{2022}</h2>
                        </div>
                        <Link to={'/detail/'+obj.id} className='text-sm font-light border-[1px] border-yellow-300 p-1 rounded-md w-max'>
                          lihat detail
                        </Link>
                      </section>
                    </figure>
                  ))
                }
                  
                </div>
            </div>
        </div>
    </section>
  )
}

