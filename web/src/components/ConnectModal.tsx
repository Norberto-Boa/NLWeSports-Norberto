import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle } from 'phosphor-react';

interface ConnectProps{
  discord: string
}


const ConnectModal = (props: ConnectProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed flex flex-col items-center bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[380px] drop-shadow-lg shadow-white/80">
        <Dialog.Title className="text-3xl font-black text-center mb-4">Let's play</Dialog.Title>
        <CheckCircle color='#22c55e' size={60} />
        <span className='text-thin text-zinc-300 mt-2 mb-6'>Agora é só começar a jogar!</span>
        <span className='text-white text-lg font-bold'>Adicione no Discord</span>
        <span className='py-2 px-6 bg-neutral-900 rounded-xl text-white text-lg mt-2 font-thin'>#{props.discord}</span>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export { ConnectModal };