import { Input } from "../Form/Input";
import {UserCircle } from "phosphor-react";
import { FormEvent, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useForm } from 'react-hook-form';


const Form = () => {
  const [loginError, setLoginError] = useState<string>("");
  const {register, handleSubmit } = useForm(); 

  const win: Window = window;

  async function handleLogin(e: FormEvent) {
    e.preventDefault();


    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData)

    if (!data.username) {
      setLoginError("Username cannot be empty")
      console.log(loginError);
      console.log(data)
      return loginError
    }

    try {
      await axios.post(`http://localhost:4444/auth`, {
        username: data.username,
        password: data.pwd
      }).then( (res) => {
        console.log(res)
        
        Cookies.set('Token', 'Bearer ' + res.data.token, { expires: 24 * 60 * 60 * 1000, path: '/'});
        win.location = '/home'
      })


    } catch(error) {
      console.log(error)
    }

  }
  
  return (
    <div
      className="flex w-[100%] mt-10 justify-center"
    >
      <form
        className="w-[380px] p-8 bg-zinc-200 rounded-lg flex justify-center flex-col items-center"
        onSubmit={handleLogin}

      >
        <div>
          <UserCircle size={68} />
        </div>

        <div
          className="mb-2"
        > <label htmlFor="username" className="font-bold"> Username: </label>
          <Input type='text'id="username" name="username" placeholder="example"/>
        </div>

        <div
          className="mb-1"
        >
          <label htmlFor="pwd" className="font-bold">Passwrod: </label>
          <Input type='password'id="pwd" name="pwd" placeholder="*****"/>
        </div>

        <span >
          Forgot your password! <span className="text-blue-800 font-bold underline">Recover it </span>
        </span>
 
        <div
          className="w-[100%]"
        >
          <button
            className="bg-violet-500 w-[100%] px-5 py-3 mt-4 rounded-md flex gap-3 justify-center font-semibold hover:bg-violet-600 transition-all duration-700"
            type="submit"
          >
            Login
          </button>
        </div>

      </form>
    </div>
  )
}

export { Form };