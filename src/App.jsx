import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
import { rapidApiHost, rapidApiKey } from '../index.js';
import CXI from "./assets/codex_ori.png"

const App = () => {
  const [URL, setURL] = useState("")
  console.log(URL)
  const [data, setData] = useState({
    firstName: "Hello",
    lastName: "",
    country: "",
    city: "",
    headLine: "",
    isCreator: "",
    isHiring: "",
    isOpenToWork: "",
    profilePicture: ""
  });

  const handleURLInput = (e) => {
    e.preventDefault()

    setURL(e.target.value)
  }

  const fetchProfileData = async () => {
    // e.preventDefault()

    const options = {
      method: 'GET',
      url: 'https://linkedin-data-api.p.rapidapi.com/get-profile-data-by-url',
      params: {
        url: `${URL}`
      },
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': rapidApiHost
      },
      // "Content-Type": "application/json"
    }
    try {
      const response = await axios.request(options);

      setData((prevData) => {
        return {
          ...prevData,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          country: response.data.geo.country,
          city: response.data.geo.city,
          headLine: response.data.headline,
          isCreator: response.data.isCreator,
          isHiring: response.data.isHiring,
          isOpenToWork: response.data.isOpenToWork,
          profilePicture: response.data.profilePicture
        }
      })
      setURL("")
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='h-screen w-screen '>
        <nav className='flex items-center justify-center flex-wrap flex-col gap-x-2'>
          <div className='flex items-center justify-center gap-x-2 mt-5'>
            <FaLinkedin size={40} />
            <p className='text-3xl font-bold text-blue-900'>
              Profile Scrapper
            </p>
          </div>
          <div className='mt-8 flex items-center justify-center gap-x-4 mb-5'>
            <input type="url" name="url" id="url" className='h-10 lg:w-[550px] min-w-[400px] rounded-lg border border-slate-700 px-5 shadow-lg' onChange={handleURLInput} value={URL}/>
            <button className='bg-blue-800 hover:bg-black h-10 w-16 text-lg font-semibold text-white rounded-lg' onClick={fetchProfileData}>Scrap</button>
          </div>
        </nav>

        <div className='flex items-center justify-evenly gap-x-10 flex-wrap-reverse mx-5 pb-2 mt-10 rounded-lg'>
          <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col gap-y-1'>
              <label className='font-semibold'>First Name</label>
              <input type="text" readOnly className='w-56 h-8 px-3 text-slate-700 outline-slate-600 border border-slate-600 rounded-lg' value={data.firstName} />
            </div>

            <div className='flex flex-col gap-y-1'>
              <label className='font-semibold'>Last Name</label>
              <input type="text" readOnly className='w-56 h-8 px-3 text-slate-700 outline-slate-600 border border-slate-600 rounded-lg' value={data.lastName} />
            </div>

            <div className='flex flex-col gap-y-1'>
              <label className='font-semibold'>Country</label>
              <input type="text" readOnly className='w-56 h-8 px-3 text-slate-700 outline-slate-600 border border-slate-600 rounded-lg' value={data.country} />
            </div>

            <div className='flex flex-col gap-y-1'>
              <label className='font-semibold'>City</label>
              <input type="text" readOnly className='w-56 h-8 px-3 text-slate-700 outline-slate-600 border border-slate-600 rounded-lg' value={data.city} />
            </div>

            <div className='flex flex-col gap-y-1'>
              <label className='font-semibold'>Head-line</label>
              <input type="text" readOnly className='w-56 h-8 px-3 text-slate-700 outline-slate-600 border border-slate-600 rounded-lg' value={data.headLine} />
            </div>

            <div className='flex flex-col gap-y-1'>
              <label className='font-semibold'>Is-Creator</label>
              <input type="text" readOnly className='w-56 h-8 px-3 text-slate-700 outline-slate-600 border border-slate-600 rounded-lg' value={data.isCreator} />
            </div>

            <div className='flex flex-col gap-y-1'>
              <label className='font-semibold'>Is-Hiring</label>
              <input type="text" readOnly className='w-56 h-8 px-3 text-slate-700 outline-slate-600 border border-slate-600 rounded-lg' value={data.isHiring} />
            </div>

            <div className='flex flex-col gap-y-1'>
              <label className='font-semibold'>Is-Open-To-Work</label>
              <input type="text" readOnly className='w-56 h-8 px-3 text-slate-700 outline-slate-600 border border-slate-600 rounded-lg' value={data.isOpenToWork} />
            </div>
          </div>

          <div>
            {
              data.profilePicture ? (
                <img src={data.profilePicture} alt="image" className='mt-5 h-96 rounded-2xl' />
              ) : (
                <img src={CXI} alt="image" className='mt-5 h-96 rounded-2xl' />
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
