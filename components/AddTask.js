import { db } from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

function AddTask() {
  let [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  
  function clearForm() {
    setTitle('')
    setDescription('')
    setIsOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
        await addDoc(collection(db, 'tasks'), {
          title: title,
          description: description,
          completed: false,
          created: Timestamp.now()
        }) 
        clearForm()
    } catch (err) {
        alert(err) 
    }
  }
 
  return (
    <>
      <div className="text-center mt-5">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/80  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add Task +
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-600"
                  >
                    Add Task
                  </Dialog.Title>
                  <form className="mt-2" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full py-2 outline-none pl-2 border-b-2 mb-4'
                        placeholder='Enter Title'    
                    />
                    <textarea 
                        className='w-full outline-none pl-2 py-2' 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Enter task description'
                    />
                    <button className='bg-gray-300 py-1 px-4 rounded mt-4' type='submit'>Done</button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}


export default AddTask