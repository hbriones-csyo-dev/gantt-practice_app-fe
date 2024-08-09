import type { ProjectTaskLinkType, ProjectTaskLinkTypeResponse } from '@/models/projectTaskLink'

import axios from 'axios'

//get data
export async function getTaskLinks() {
  try {
    const { data, status } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/ProjectTaskLink/GetAllProjectTaskLink`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )

    // const ganttData: ProjectTaskLinkTypeResponse = {
    //   links: data
    // }

    // console.log(JSON.stringify(data, null, 4))

    console.log('getTaskLinks: response status is: ', status)

    return { links: data }
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
export async function addTaskLinks(tasks: ProjectTaskLinkType[]) {
  try {
    console.log(JSON.stringify(tasks, null, 4))
    const { data, status } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/ProjectTaskLink/AddProjectTaskLink`,
      tasks,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    // console.log(JSON.stringify(data, null, 4))

    console.log('addTaskLinks: response status is: ', status)

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
export async function updateTaskLinks(tasks: ProjectTaskLinkType[]) {
  try {
    console.log(JSON.stringify(tasks, null, 4))
    const { data, status } = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/ProjectTaskLink/UpdateProjectTaskLink`,
      tasks,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    //  console.log(JSON.stringify(data, null, 4))

    console.log('updateTaskLinks: response status is: ', status)

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
export async function deleteTaskLinks(tasks: ProjectTaskLinkType[]) {
  try {
    console.log(JSON.stringify(tasks, null, 4))
    const { data, status } = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/ProjectTaskLink/DeleteProjectTaskLink`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: tasks
      }
    )

    // console.log(JSON.stringify(data, null, 4))

    console.log('deleteTaskLinks: response status is: ', status)

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
