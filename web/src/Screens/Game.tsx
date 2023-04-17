import '../styles/main.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react.es';
import { AdCard } from '../components/AdCard';
import Cookies from 'js-cookie';
import { baseUrl } from "../utils/baseUrl";
import { ArrowLeft } from "phosphor-react";
import { useNavigate } from "react-router-dom";


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
  const [loaded, setLoaded] = useState(3.1);
  const [sliderRef] = useKeenSlider({
    initial: 0,
    breakpoints: {
      "(min-width: 480px)": {
        slides: {
          perView: 1.2,
          spacing: 24
        },
        loop: true
      },
      "(min-width: 640px)": {
        slides: {
          perView: 1.8,
          spacing: 24
        },
        loop: true
      },
      "(min-width: 768px)": {
        slides: {
          perView: 2.2,
          spacing: 24
        },
        loop: true
      },
      "(min-width: 900px)": {
        slides: {
          perView: 2.8,
          spacing: 24
        },
        loop: true
      },
      "(min-width: 1024px)": {
        slides: {
          perView: loaded,
          spacing: 24
        },
        loop: true
      },
    },
    slides: {
      perView: 1,
      spacing: 24
    },
  })

  const [game, setGame] = useState<GameProps>()
  const [ads , setAds] = useState<Ad[]>([])
  const { id } = useParams()
  const token: string = Cookies.get('Token') ?? "";

  useEffect(() => {
    axios.get(`${baseUrl}/games/${id}/ads`, {
      headers: {
        'Authorization' :  `${token}`
      }
    })
      .then(res => {
        setAds(res.data)
      })
    
    axios.get(`${baseUrl}/game/${id}`, {
      headers: {
        'Authorization' :  `${token}`
      }
    })
      .then(res => {
        setGame(res.data)
      })
  }, [])

  const navigate = useNavigate();

  setTimeout(() => setLoaded(3.2), 2500)

  return (
    

    <div className='xl:max-w-[1344px] lg:max-w-5xl md:max-w-3xl sm:max-w-xl max-w-sm mx-auto flex flex-col items-center my-20'>
      <button
        className="absolute top-5 left-5 text-white transition-all hover:text-zinc-400"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={44}/>
      </button>
      <div className={`bg-[url('${game?.bannerUrl}')] w-full h-80 relative mx-auto`}>
        <img src={'https://images.hdqwalls.com/wallpapers/kylian-mbappe-fifa-22-5k-sl.jpg'} className='w-full h-80 object-cover object-center rounded-3xl' />
        <div className='bg-[rgba(0,0,0,0.6)] w-full h-full absolute top-0 left-0 overflow-hidden rounded-3xl flex justify-center items-center'>
          <h1 className='text-6xl text-white font-black text-center'>
            {game?.title}
          </h1>
        </div>
      </div>

      <h1 className='text-4xl text-white font-black text-center my-8'>
        Connecte-se e comece a jogar bem
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