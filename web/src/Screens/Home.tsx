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
  const [user, setUser] = useState<string>('');
  const [decoded, setDecoded] = useState<tokenDecoded>();

  useEffect(() => {
    axios.get('http://localhost:4444/games')
      .then(res => {
        setGames(res.data)
        setDecoded(jwt(token));
      });
  }, [])


  
  const checkJWT = () => {
    const tokenTime = decoded?.exp === undefined ?  0 : decoded?.exp * 1000;

    if (tokenTime === undefined) {
      console.log(tokenTime);
      return false
    } else if (tokenTime != undefined) {
      if (tokenTime * 1000 > Date.now()) {
        console.log(tokenTime);
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

      <h1 className='text-6xl text-white font-black mt-20'>
        {decoded?.name}
      </h1>

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((item) => {
          return (
            <GameBanner
              key={item.id}
              bannerUrl={item.bannerUrl}
              name={item.title}
              adsCount={item._count.ads}
            />
          )
        })}
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