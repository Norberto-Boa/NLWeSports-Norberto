import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

interface Props {
  tokenValid?: boolean
}

export const CreateBanner = ({ tokenValid }: Props) => {
  return (
    <div className="w-full">
      <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8 lg:max-w-5xl  min-[910px]:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-sm mx-auto'>
        <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center max-md:flex-col max-md:justify-evenly max-md:gap-8'>
          <div>
            <strong className='text-2xl text-white font-black block max-md:text-center'>Não encontrou seu duo?</strong>
            <span className='text-zinc-400 block max-md:text-center'>Publique um anúncio para encontrar novos players!</span>
          </div>

          <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 transition-all duration-500 text-white rounded flex items-center gap-3'>
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>

        </div>
      </div>
    </div>
  )
}
