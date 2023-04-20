import { useForm, SubmitHandler } from 'react-hook-form';
import { Warning } from 'phosphor-react';
import axios from 'axios';
import { useState } from 'react';
import { baseUrl } from "../utils/baseUrl";
import { Link } from "react-router-dom";

interface ErrorMessage{
  message: string
}

interface RegInputs{
  name: string
  username: string
  password: string
  email: string
}

interface ErrorFace{
  message: string
}


const ErrorMessage = (props: ErrorMessage) => {
  

  return (
    <span
      className='text-red-700 font-bold flex justify-center items-center gap-1'
    >
      <Warning color='#b91c1c' size={24} weight={'bold'} />
      {props.message}
    </span>
  )
}

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegInputs>();
  const onSubmit: SubmitHandler<RegInputs> = async data => {
    HandleSubmit(data)
  }

  const [error, setError] = useState(null)
  const errorDiv = error ? 
    <div className="mt-4">
      <p>
        <Warning className="text-red-600" /> <span>{error}</span>
      </p>
    </div>
    : ''



  const win: Window = window;
  async function HandleSubmit(data: RegInputs) {
    setError(null);
    try {
      await axios.post(`${baseUrl}/register`, {
        username: data?.username,
        name: data?.name,
        password: data?.password,
        email: data?.email
      }).then(async (res) => {

        if (res.status != 200) {
          alert('Something went wrong!')
          return
        } else {
          if (res.data.status == 500) {
            const err = JSON.parse(res.data.message) 
            setError(err[0].message);
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="flex w-[100%] mt-10 justify-center"
    >
      <form
      className="w-[380px] p-8 bg-zinc-200 rounded-lg flex justify-center flex-col items-start gap-y-2"
      onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-center font-bold w-[100%] text-2xl uppercase mb-1'>Register</h1>

        <div className='w-[100%] h-[1px] bg-zinc-400 mb-2'></div>
        <div className='w-[100%]'>
          <label htmlFor="name" className="font-bold">Name</label>
          <input
          {...register("name", {required: true})}
            className="bg-zinc-900 text-zinc-200 mt-1 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%]"
            placeholder='Example'  
          />
          {errors?.name?.type === "required" && 
            <ErrorMessage
              message='This field is required'
            />
          }
        </div>
        
        <div className='w-[100%]'>
          <label htmlFor="name" className="font-bold">Username</label>
          <input
            {...register("username", {required: true, maxLength: 20})}
            className="bg-zinc-900 text-zinc-200 mt-1 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%]"
            placeholder={`Example_${new Date().getMilliseconds()}`}
          />

          {errors?.username?.type === "required" && 
            <ErrorMessage
              message='This field is required'
            />
          }
          
        {errors?.username?.type === "maxLength" && 
          <ErrorMessage
            message='This field cannot exceed 20 characters'
          />
        }
        </div>

        <div className='w-[100%]'>
          <label htmlFor="email" className="font-bold">Email</label>
        <input
          type={'email'}
            {...register("email", { required: true })}
          className="bg-zinc-900 text-zinc-200 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%]"
          placeholder='Password'
        />

        {errors?.email?.type === "required" && 
          <ErrorMessage
            message='This field is required'
          />
        }
        </div>

        <div className='w-[100%]'>
          <label htmlFor="pwd" className="font-bold">Password</label>
        <input
          type={'password'}
          {...register("password", {required: true, minLength: 8})}
          className="bg-zinc-900 text-zinc-200 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%]"
          placeholder='Password'
        />

        {errors?.password?.type === "required" && 
          <ErrorMessage
            message='This field is required'
          />
        }

        {errors?.password?.type === "minLength" && 
          <ErrorMessage
            message='This field must have a minimum of 8 letters'
          />
        }
        </div>
  
        
        {errorDiv}

       <input
            className="bg-violet-500 w-[100%] px-5 py-3 mt-2 mb-4 rounded-md flex gap-3 justify-center font-semibold hover:bg-violet-600 transition-all duration-700"
            type="submit"
        />
        
        <p className="text-lg text-center">Already registered! <Link className="text-blue-800 font-bold underline" to={`/`}>Log in </Link></p>
        
      </form>
    </div>
    
  )
}

export { Register };