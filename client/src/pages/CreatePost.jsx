import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { FormField, Loader } from "../components"
import { getRandomPrompt } from '../utils'

const CreatePost = () => {
  const navigate = useNavigate()
  const [ form, setForm ] = useState({
  name:'',
  prompt: '',
  photo: '',
  })
  
  const [ generatingImg, setGeneratingImg ] = useState(false)
  const [ loading, setLoading ] = useState(false)


  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value })

const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt})

  }
//__________generating image from DALL-E API___________

  const generateImage  = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        // ______passing data to backend to get back response as image

        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
             prompt: form.prompt, 
          }),
        })
        // parse response to json
        const data = await response.json()

      //   const response = await fetch('http://localhost:8080/api/v1/dalle', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //         prompt: form.prompt, 
      //     }),
      // });

      // const data = await response.json();
      
      console.log(data); // Log the response data for inspection


        // set form photo to data url
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })

         
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please provide proper prompt')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  

return (
    <section className="max-w-7xl mx-auto">
       <div>
        <h1 className="font-extrabold text-[#222328]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Create imaginative and visually stunning images through DALL-E AI and share them with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit} >
        <div className="flex flex-col gap-5">
          <FormField 
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            labelName="Pormpt"
            type="text"
            name="prompt"
            placeholder="a sea otter with a pearl earring"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rouonded-lg focus:ring-blue-500 focus:border-blue-500 2064 0-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ):(
              <img 
                src={preview}
                alt="preview"
                className="w-5/12 h-5/12 object-contain opacity-40"
              />
            )}

              {generatingImg && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded -lg">
                    <Loader />
                </div>
              )}

          </div>
          
        </div>
        <div className="mt-5 flex gap-5">
          <button
          type="button"
          onClick={generateImage}
          className="text-white bg-green-700 font-medium rounded-md text text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generatine...' : 'Generate'}
          </button>

        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666375] text-[14px] ">Once you have created the image you want, you can share it with others in the community</p>
          <button  
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rouded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          
          >
           Share
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost