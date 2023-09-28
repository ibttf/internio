"use client";
import {useState} from 'react';
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  return (
    <div className="">
      <div className="text-2xl font-bold mb-5">Get email notifications with the latest job updates.</div>
      <form className="inline-flex max-w-sm">
        <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-none">
          <input onChange={(e)=>setEmail(e.target.value)} type="email" className="form-input py-1.5 w-full mb-2 sm:mb-0 sm:mr-2" placeholder={success ? "" : "Your email"} aria-label="Your email" />
          <button onClick={(e)=>{e.preventDefault(); setSuccess(true)}}className="btn-sm text-white bg-indigo-500 hover:bg-indigo-600 shadow-sm whitespace-nowrap" type="submit">
            Join Newsletter
          </button>
          
        </div>
        {/* Success message */}
        {
              success &&
              <p className="font-medium text-emerald-600 text-center sm:text-left sm:absolute mt-2 opacity-75 text-sm">Thanks for subscribing!</p>
            }

       
      </form>
    </div>
  )
}