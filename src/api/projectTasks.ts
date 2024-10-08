import type { ProjectTaskTypeResponse, ProjectTaskType } from '@/models/projectTask'

import axios from 'axios'

//get data
export async function getTasks() {
  try {
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/ProjectTask/GetProjectTask`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )

    const ganttData: ProjectTaskTypeResponse = {
      tasks: data
    }

    //console.log(JSON.stringify(data, null, 4))

    console.log('getTasks: response status is: ', status)

    return ganttData
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.log('unexpected error: ', error)
      throw new Error('An unexpected error occurred')
    }
  }
}

//add data
export async function addTasks(tasks: ProjectTaskType[]) {
  try {
    console.log(JSON.stringify(tasks, null, 4))
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/ProjectTask/AddTask`,
      tasks,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    // console.log(JSON.stringify(data, null, 4))

    console.log('addTasks: response status is: ', status)

    return { tasks: data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.log('unexpected error: ', error)
      throw new Error('An unexpected error occurred')
    }
  }
}

//update data
export async function updateTasks(tasks: ProjectTaskType[]) {
  try {
    console.log(JSON.stringify(tasks, null, 4))
    const { data, status } = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/ProjectTask/UpdateTask`,
      tasks,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    //  console.log(JSON.stringify(data, null, 4))

    console.log('updateTasks: response status is: ', status)

    return { tasks: data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.log('unexpected error: ', error)
      throw new Error('An unexpected error occurred')
    }
  }
}

//delete
export async function deleteTasks(tasks: ProjectTaskType[]) {
  try {
    console.log(JSON.stringify(tasks, null, 4))
    const { data, status } = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/ProjectTask/DeleteProjectTask`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: tasks
      }
    )

    // console.log(JSON.stringify(data, null, 4))

    console.log('deleteTasks: response status is: ', status)

    return { tasks: data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message)
    } else {
      console.log('unexpected error: ', error)
      throw new Error('An unexpected error occurred')
    }
  }
}
