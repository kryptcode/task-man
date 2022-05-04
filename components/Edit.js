import { Fragment, useState } from 'react'
import { db } from '../firebase'
import { doc, updateDoc } from "firebase/firestore";
import { Dialog, Transition } from '@headlessui/react'

export default function Edit({ editTitle, editDescription, id }) {
  let [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(editTitle)
  const [description, setDescription] = useState(editDescription)

  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'tasks', id)
    try{
      await updateDoc(taskDocRef, {
        title: title,
        description: description
      })
      clearForm()
    } catch (err) {
      alert(err)
    }    
  }

  function clearForm() {
    setIsOpen(false)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className=""
        >
          Edit
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
                    className="text-lg font-medium leading-6 text-gray-500"
                  >
                    Edit Task
                  </Dialog.Title>
                  <form className='mt-5' onSubmit={handleUpdate}>
                    <input 
                        type='text' 
                        className='w-full outline-none py-2 pl-1 mb-4'
                        name='title' 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title}
                    />
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full py-2 pl-1 mb-4" />
                    <button type='submit' className='bg-white text-black rounded py-1 px-3'>Edit</button>
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