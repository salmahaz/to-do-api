"use client";

import { CiSquarePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};
export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  //const [taskTitle, setTaskTitle] = useState("");
  const [taskId, setTaskId] = useState<number | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const openPopup = (taskTitle : string, taskId : number) => {
    setIsPopupVisible(true);
    console.log('Pop is Opened');
    //setTaskTitle(taskTitle);
    setNewTaskTitle(taskTitle);
    setTaskId(taskId);
    console.log(taskId);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setTaskId(null);
  };

  const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
    console.log(newTask);
  };

  const handleTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setNewTaskTitle(e.target.value);  
    console.log(newTaskTitle); 
};


  const addTask = () => {
    fetch("api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask }),
    })
      .then((response) => response.json())
      .then((data) => setTasks(data));
    setNewTask("");
  };

  const deleteTask = (taskId: number) => {
    fetch("api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId }),
    })
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  const UpdateTask = () => {
    if (taskId !== null) {  
        fetch("api/tasks", {
          method: "PUT",  
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: taskId,  
            title: newTaskTitle,  
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setTasks(data);  
            closePopup();  
          });
      }
  }

  useEffect(() => {
    fetch("api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);
  return (
    <div className="bg-gray-400 py-8 px-4 min-h-screen">
      {/*Card*/}
      <div className="max-w-2xl mx-auto rounded-lg bg-white p-2 shadow-lg">
        <h1 className="text-center my-6">Task Manager</h1>
        {/*First Part*/}
        <div className="flex items-center sm:flex-row sm:space-x-2">
          <input
            type="text"
            placeholder="Add Task"
            value={newTask}
            onChange={handleTask}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500 flex-1 w-full sm:w-auto"
          />
          <button title="add Task?" className="" onClick={addTask}>
            <CiSquarePlus size={45} />
          </button>
        </div>
        {/*List Of Tasks*/}

        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between my-3">
            <p>{task.title}</p>
            <div className="mx-2 flex space-x-2">
              <CiTrash
                size={25}
                title="delete?"
                onClick={() => deleteTask(task.id)}
              />
              <CiEdit size={25} title="edit?" onClick={() => openPopup(task.title , task.id)} />
            </div>
          </div>
        ))}
        {isPopupVisible && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
         <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-2xl w-full sm:w-auto mx-4">
           <h2 className="text-xl font-bold mb-4 text-center">Edit Task</h2>
           <input
             title="newTaskTitle?"
             type="text"
             value={newTaskTitle}
             onChange={handleTaskTitle}
             className="border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-500 w-full mb-4"
           />
           <div className="flex justify-end space-x-2">
             <button
               onClick={UpdateTask}
               className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600"
             >
               Edit Task
             </button>
             <button
               onClick={closePopup}
               className="px-4 py-2 bg-white text-gray-400 rounded-lg hover:bg-gray-600 border border-gray-300 hover:text-white"
             >
               Close
             </button>
           </div>
         </div>
       </div>
       
        )}
      </div>
    </div>
  );
}
