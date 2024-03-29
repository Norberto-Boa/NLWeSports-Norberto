import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';

import { Input } from './Form/Input';
import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { baseUrl } from "../utils/baseUrl";

interface GameProps {
  id: string,
  title: string,
}

export const CreateAdModal = () => {
  const [games, setGames] = useState<GameProps[]>([]);
  const [weekdays, setWeekdays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  const token: string = Cookies.get('Token') ?? "";

  useEffect(() => {
    axios(`${baseUrl}/games`)
      .then(res => {
        setGames(res.data)
      });
  }, [])


  async function handleCreateAd(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return console.log(data)
    }

    try {
      
      await axios.post(`${baseUrl}/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekdays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      },
        {
          headers: {
            'Authorization' :  `${token}`
        }
      });

      alert('Anuncio criado')
      window.location.reload();

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] drop-shadow-lg shadow-white/80">
        <Dialog.Title className="text-3xl font-black">Publique um anuncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
            <select
              name="game"
              id="game"
              placeholder='Selecione o game que deseja jogar'
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
            >
              <option disabled value={""} className="text-zinc-500">Selecione o game que deseja jogar</option>
              {games.map(game => {
                return <option key={game.id} value={game.id}> {game.title} </option>
              })}
            </select>
          </div>

          <div >
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              name="name"
              id="name"
              placeholder='Como te chamam dentro game?'
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input
                id='yearsPlaying'
                name="yearsPlaying"
                type="number"
                placeholder='Tudo bem ser ZERO'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                id="discord"
                name="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type='multiple'
                className='grid grid-cols-4 gap-2'
                value={weekdays}
                onValueChange={setWeekdays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 rounded ${weekdays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Domingo'
                >D
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="1"
                  className={`w-8 h-8 rounded ${weekdays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Segunda'
                >S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="2"
                  className={`w-8 h-8 rounded ${weekdays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Terca'
                >T
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="3"
                  className={`w-8 h-8 rounded ${weekdays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Quarta'
                >Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="4"
                  className={`w-8 h-8 rounded ${weekdays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Quinta'
                >Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="5"
                  className={`w-8 h-8 rounded ${weekdays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Sexta'
                >S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="6"
                  className={`w-8 h-8 rounded ${weekdays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title='Sabado'
                >S
                </ToggleGroup.Item>
              </ToggleGroup.Root>

            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hourStart">Qual hora do dia?</label>
              <div className='grid grid-cols-2 gap-2'>
                <Input type="time" name="hourStart" id="hourStart" placeholder='De' />
                <Input type="time" name="hourEnd" id="hourEnd" placeholder='Ate' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root
              checked={useVoiceChannel}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex gap-4 justify-end'>
            <Dialog.Close
              type='button'
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-700 transition-all duration-700'
            > Cancelar
            </Dialog.Close>

            <button
              className="bg-violet-500 px-5 py-3 rounded-md flex gap-3 justify-center font-semibold hover:bg-violet-600 transition-all duration-700"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>

        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
