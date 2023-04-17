import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { ConnectModal } from './ConnectModal';


interface AdProps{
  name: string
  weekDays: []
  useVoiceChannel: boolean
  yearsPlaying: number
  hourStart: string
  discord: string
  hourEnd: string
}

const AdCard = (props: AdProps) => {

  console.log(props.weekDays)

  return (
    <div className="keen-slider__slide h-30 bg-zinc-800 rounded-xl !w-72 flex flex-col py-5 px-4">
      <div className="py-2 ">
        <p className="text-slate-400 font-bold text-lg">Nome</p>
        <span className="text-zinc-100 font-bold text-lg">{props.name}</span>
      </div>

      <div className="py-2 ">
        <p className="text-slate-400 font-bold text-lg">Tempo de jogo</p>
        <span className="text-zinc-100 font-bold text-lg">{props.yearsPlaying}</span>
      </div>

      <div className="py-2 ">
        <p className="text-slate-400 font-bold text-lg">Disponibilidade</p>
        <span className="text-zinc-100 font-bold text-lg">{props.weekDays?.length} • {props.hourStart}h - {props.hourEnd}h</span>
      </div>

      <div className="py-2">
        <p className="text-slate-400 font-bold text-lg">Chamada de Audio</p>
        <span className="text-zinc-100 font-bold text-lg">{props.useVoiceChannel ? 'Sim' : 'Nao'}</span>
      </div>
  
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className='bg-violet-600 py-2 mt-2 rounded-md text-white font-bold uppercase hover:bg-violet-800 transition-all duration-500' >
            Conecte-se
          </button>
        </Dialog.Trigger>
        <ConnectModal
          discord={props.discord}
        />
      </Dialog.Root>

    </div >
  )
}

export { AdCard };