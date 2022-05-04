import { useState, useEffect } from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import { db } from '../firebase'
import Task from './Task'

const TasksList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])
  
  return (
    <div className='w-2/3 mx-auto mt-8'>
      {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              title={task.data.title} 
              description={task.data.description}
            />
      ))}
    </div>
  )
}

export default TasksList