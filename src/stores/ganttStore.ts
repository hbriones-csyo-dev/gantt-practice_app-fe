import {
  addTaskLinks,
  deleteTaskLinks,
  getTaskLinks,
  updateTaskLinks
} from '@/api/projectTaskLinks'
import { getTasks, addTasks, updateTasks, deleteTasks } from '@/api/projectTasks'
import type { ProjectTaskType } from '@/models/projectTask'
import type { ProjectTaskLinkType } from '@/models/projectTaskLink'
import { defineStore } from 'pinia'

type IGanttData = {
  tasks: ProjectTaskType[]
  links: ProjectTaskLinkType[]
}

export const useGanttStore = defineStore('gantt', {
  state: () => ({
    ganttData: {} as any,
    addedGanttData: [] as ProjectTaskType[],
    updatedGanttData: [] as ProjectTaskType[],
    deletedGanttData: [] as ProjectTaskType[],
    addedGanttDataLink: [] as ProjectTaskLinkType[],
    updatedGanttDataLink: [] as ProjectTaskLinkType[],
    deletedGanttDataLink: [] as ProjectTaskLinkType[]
  }),
  getters: {},
  actions: {
    async fetchGanttData() {
      try {
        const dataTasks = await getTasks()
        const dataTaskLinks = await getTaskLinks()

        this.ganttData = {
          tasks: dataTasks.tasks,
          links: dataTaskLinks.links
        }
      } catch (error) {
        console.error('Failed to fetch Gantt data:', error)
      }
    },
    addGanttData(task: ProjectTaskType) {
      this.addedGanttData.push(task)
    },
    updateGanttData(task: ProjectTaskType) {
      this.updatedGanttData.push(task)
    },
    deleteGanttData(task: ProjectTaskType) {
      this.deletedGanttData.push(task)
    },
    addGanttDataLink(link: ProjectTaskLinkType) {
      this.addedGanttDataLink.push(link)
    },
    updateGanttDataLink(link: ProjectTaskLinkType) {
      this.updatedGanttDataLink.push(link)
    },
    deleteGanttDataLink(link: ProjectTaskLinkType) {
      this.deletedGanttDataLink.push(link)
    },
    async saveGanttData() {
      //tasks
      await addTasks(this.addedGanttData)
      this.addedGanttData = []

      await updateTasks(this.updatedGanttData)
      this.updatedGanttData = []

      await deleteTasks(this.deletedGanttData)
      this.deletedGanttData = []

      //links
      await addTaskLinks(this.addedGanttDataLink)
      this.addedGanttData = []

      await updateTaskLinks(this.updatedGanttDataLink)
      this.updatedGanttDataLink = []

      await deleteTaskLinks(this.deletedGanttDataLink)
      this.deletedGanttDataLink = []
    }
  }
})
