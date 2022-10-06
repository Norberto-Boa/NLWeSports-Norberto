import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';

import './styles/main.css';

import LogoImg from './assets/Logo-nlw.svg';
import { CreateBanner } from './components/CreateBanner';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

interface GameProps {
  id: string,
  bannerUrl: string,
  title: string,
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<GameProps[]>([]);

  useEffect(() => {
    axios('http://localhost:4444/games')
      .then(res => {
        setGames(res.data)
      });
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={LogoImg} alt="" />

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
        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default App
