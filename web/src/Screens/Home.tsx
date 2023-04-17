import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from '../components/GameBanner';

import '../styles/main.css';

import LogoImg from '../assets/Logo-nlw.svg';
import { CreateBanner } from '../components/CreateBanner';
import { CreateAdModal } from '../components/CreateAdModal';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { baseUrl } from "../utils/baseUrl";
import { CreateGameTrigger } from "../components/CreateGameTrigger";
import { CreateGameModal } from "../components/CreateGameBanner";
import { setInterval } from "timers/promises";


interface GameProps {
  id: string,
  bannerUrl: string,
  title: string,
  _count: {
    ads: number
  }
}

interface tokenDecoded{
  exp: number,
  iat: number,
  sub: string,
  username: string,
  name: string
}

const Home = () => {
  const [games, setGames] = useState<GameProps[]>([]);
  const token: string = Cookies.get('Token', ) ?? ""; 
  const [decoded, setDecoded] = useState<tokenDecoded>()!;
  
  const [loaded, setLoaded] = useState(5.5);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 500px)": {
        slides: {
          perView: 3.2,
          spacing: 24
        }
      },
      "(min-width:600px)": {
        slides: {
          perView: 3.5,
          spacing: 24
        }
      },
      "(min-width:700px)": {
        slides: {
          perView: 3.9,
          spacing: 24
        }
      },
      "(min-width:850px)": {
        slides: {
          perView: 4.4,
          spacing: 24
        }
      },
      "(min-width:920px)": {
        slides: {
          perView: 4.8,
          spacing: 24
        }
      },
      "(min-width:1020px)": {
        slides: {
          perView: 5.2,
          spacing: 24
        }
      },
      "(min-width:1100px)": {
        slides: {
          perView: loaded,
          spacing: 24
        }
      },
    },
    slides: {
      perView: 2.4,
      spacing: 24,
    },
    drag: true,
  });


  useEffect(() => {
    axios.get(`${baseUrl}/games`)
      .then(res => {
        setGames(res.data)
        setDecoded(jwt(token));
      });
  }, [])

  
  function handleCarouselActivation(){ 
    setLoaded(6.5)
  }

  setTimeout(handleCarouselActivation, 2500)


  const checkJWT = () => {
    const tokenTime = decoded?.exp === undefined ?  0 : decoded?.exp * 1000;

    if (tokenTime === undefined) {
      return false
    } else if (tokenTime != undefined) {
      if (tokenTime * 1000 > Date.now()) {
        return true
      } else {
        return false
      }
    }
  }

  const isLogged = checkJWT();


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={LogoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20 text-center mx-8'>
        {decoded?.name}
      </h1>

      <h1 className='text-6xl text-white font-black mt-20 text-center mx-8'>
        Seu <span className='bg-gradient-to-r from-violet-500 via-blue-500 to-yellow-300 bg-clip-text text-transparent'>duo</span> está aqui
      </h1>

      {/* <button
        className="mt-8 px-4 py-3 bg-violet-500 rounded-lg text-lg text-white font-semibold"
        onClick={()=>{}}
      >
        Activate Carousel
      </button> */}
      
      <div ref={sliderRef} className='keen-slider mt-16 lg:max-w-5xl'>
        {games.map((item) => {
          return (
            <GameBanner
              id={item.id}
              key={item.id}
              bannerUrl={item.bannerUrl}
              name={item.title}
              adsCount={item._count.ads}
            />
          )
        })}
        {
          isLogged ?
            <div className="keen-slider__slide rounded-lg overflow-hidden border-4 border-violet-500">
              <Dialog.Root>
                <CreateGameTrigger />
                <CreateGameModal />
              </Dialog.Root>
            </div>
            : 
          <div />
        }
        

      </div>

      <Dialog.Root>
        <CreateBanner />

        {
          isLogged ? <CreateAdModal /> : <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] drop-shadow-lg shadow-white/80">
              <Dialog.Title className="text-3xl font-black">You're Not Authorized to do this</Dialog.Title>
            </Dialog.Content>
          </Dialog.Portal>
        }
       
        
      </Dialog.Root>

    </div>
  )
}

export { Home };