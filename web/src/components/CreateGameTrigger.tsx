import * as Dialog from "@radix-ui/react-dialog";
import { PlusCircle } from "phosphor-react";

export const CreateGameTrigger = () => {
  return (
    <Dialog.Trigger className='relative rounded-lg overflow-hidden'>
      <div className="w-full py-8 px-4 h-full flex flex-col items-center justify-center gap-2">
        <PlusCircle size={50} className="text-violet-500" />
        <span className="font-bold text-white text-lg"> Criar novo jogo</span>
      </div>
    </Dialog.Trigger>
  )
}
