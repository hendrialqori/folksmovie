import { BsFillPersonCheckFill } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

export const Card = props => {
  const { id ,title, poster_path, release_date, vote_average, vote_count } = props
  return (
    <Link key={id} to={'/detail/'+id}>
      <figure className="rounded-[2px] relative flex flex-row md:flex-col items-center w-[300px] sm:w-[200px] lg:w-[220px]" aria-label="card__wrapper">
        <header>
          <LazyLoadImage
            src={'https://image.tmdb.org/t/p/w200'+ poster_path }
            alt={'movie-avatar'}
            effect="blur"
            className='h-[250px] w-[700px] object-fill'
          />
        </header>
        <figcaption className="flex flex-col items-center p-2">
          <h1 className="font-semibold text-md text-center leading-5">{title}</h1>
          <div className='flex gap-4 items-center my-2' aria-label='information'>
            <span className='flex gap-1'>
              <AiFillStar className='text-yellow-500' />
              <p className='text-xs font-light'>{vote_average}</p>
            </span>
            <span className='flex gap-2'>
              <BsFillPersonCheckFill className='text-gray-400' />
              <p className='text-xs font-light'>{vote_count}</p>
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold">{release_date}</p>
        </figcaption>
      </figure>
    </Link>
  ) 
}