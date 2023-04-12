import '../styles/main.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react.es';
import { AdCard } from '../components/AdCard';
import Cookies from 'js-cookie';


interface GameProps{
  id: string,
  title: string,
  bannerUrl: string
}

interface Ad{
  id: string
  name: string
  weekDays: []
  useVoiceChannel: boolean
  yearsPlaying: number
  hourStart: string
  hourEnd: string
  discord: string
}


const Game = () => {
  const [currentSlide, setCurrentSlide] =useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    loop: true,
    range: {
      max: 2,
      min: 1
    }
    
  })

  const [game, setGame] = useState<GameProps>()
  const [ads , setAds] = useState<Ad[]>([])
  const { id } = useParams()
  const token: string = Cookies.get('Token') ?? "";

  console.log(token)

  useEffect(() => {
    axios.get(`http://localhost:4444/games/${id}/ads`, {
      headers: {
        'Authorization' :  `${token}`
      }
    })
      .then(res => {
        setAds(res.data)
      })
    
    axios.get(`http://localhost:4444/game/${id}`, {
      headers: {
        'Authorization' :  `${token}`
      }
    })
      .then(res => {
        setGame(res.data)
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <div className={`bg-[url('${game?.bannerUrl}')] w-full h-80 relative`}>
        <img src={'https://images.hdqwalls.com/wallpapers/kylian-mbappe-fifa-22-5k-sl.jpg'} className='w-full h-80 object-cover object-center rounded-3xl' />
        <div className='bg-[rgba(0,0,0,0.6)] w-full h-full absolute top-0 left-0 overflow-hidden rounded-3xl flex justify-center items-center'>
          <h1 className='text-6xl text-white font-black text-center'>
            {game?.title}
          </h1>
        </div>
      </div>

      <h1 className='text-4xl text-white font-black text-center my-8'>
        Connecte-se e comece a jogar
      </h1>

      <div ref={sliderRef} className='keen-slider'>
        {ads.map((item) => {
          return (
            <AdCard
              name={item.name}
              hourEnd={item.hourEnd}
              hourStart={item.hourStart}
              useVoiceChannel={item.useVoiceChannel}
              weekDays={item.weekDays}
              discord={item.discord}
              yearsPlaying={item.yearsPlaying}
              key={item.id}
            />
          ) 
        })}
      </div>
      
    </div>
  )
}

export { Game };