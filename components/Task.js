import { useState   } from 'react'
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase'
import View from './View';
import Edit from './Edit';

const Task = ({ id, title, description, completed }) => {
  const [checked, setChecked] = useState(completed)

  console.log(completed);

  /* function to update checked state in document in firestore */
  const handleCheckedChange = async () => {
    const taskDocRef = doc(db, 'tasks', id)
    try{
      await updateDoc(taskDocRef, {
        completed: checked
      })
      setChecked(!checked)
    } catch (err) {
      alert(err)
    }
  }

  /* function to delete the document with preferred id from firstore */ 
  const handleDelete = async () => {
    const taskDocRef = doc(db, 'tasks', id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className={`mt-5 w-full bg-white rounded-lg border-l-4 p-4 ${!checked ? 'border-gray-400' : 'border-green-700' } flex justify-between space-x-6 shadow-lg shadow-gray-400`}>
        <div className='flex items-center'>
          <input 
            type="checkbox" 
            name="checkbox" 
            id={`checkbox-${id}`}
            checked={checked}
            onClick={handleCheckedChange}
            className='cursor-pointer' 
          />

        </div>
        <div className='flex-grow space-y-5'>
          <div className='space-y-3'>
            <h2 className='text-3xl font-semibold text-blue-500'>
              {title.toUpperCase()}
            </h2>
            <p className=''>
              {description}
            </p>
          </div>
          <div className='flex space-x-5'>
            <Edit editTitle={title} editDescription={description} id={id} />
            <button className='text-red-600' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
        <View title={title} description={description} />
    </div>
  )
}

export default Task