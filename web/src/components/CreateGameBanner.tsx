import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./Form/Input";
import { FormEvent, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import Cookies from "js-cookie";

export const CreateGameModal = () => {
  const [urlStatus, seturlStatus] = useState(0);
  const token: string = Cookies.get('Token') ?? "";

  
  
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    
    console.log(data);
    const res = await axios.get(`${data.bannerUrl}`)
      .then(() => {
        axios.post(`${baseUrl}/game`, {
          title: data.title,
          bannerUrl: data.bannerUrl
        }, {
          headers: {
            'Authorization': `${token}`
          }
        }).then((res) => {
          console.log(res)
          alert('Jogo criado!')
          window.location.reload();
        })
      })
      .catch(() => {
        alert('Url invalido')
      });

      

      
  }

    return (
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

        <Dialog.Content
          className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] drop-shadow-lg shadow-white/80"
        >
          <Dialog.Title
            className="text-xl font-bold text-center w-full pb-2 border-b-2 border-white/20"
          >
            Criar novo jogo
          </Dialog.Title>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Nome do Jogo:</label>
              <Input
                placeholder="Ex: Fortnite"
                name="title"
                id="title"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="bannerUrl">Link do banner(Copie do twitch):</label>
              <Input
                placeholder="Ex: https://static-cdn.jtvnw.net/ttv-boxart/511224-188x250.jpg"
                name="bannerUrl"
                id="bannerUrl"
              />
            </div>

            <button
              className="bg-violet-500 py-3 px-4 rounded w-full"
              type="submit"
            >
              Criar Jogo
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>

    )
  
}