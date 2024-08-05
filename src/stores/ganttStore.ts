import { getTasks, addTasks, updateTasks, deleteTasks } from '@/api/projectTasks'
import type { ProjectTaskType, ProjectTaskTypeResponse } from '@/models/projectTask'
import { defineStore } from 'pinia'

export const useGanttStore = defineStore('gantt', {
  state: () => ({
    ganttData: {} as ProjectTaskTypeResponse,
    addedGanttData: [] as ProjectTaskType[],
    updatedGanttData: [] as ProjectTaskType[],
    deletedGanttData: [] as ProjectTaskType[]
  }),
  getters: {},
  actions: {
    async fetchGanttData() {
      try {
        const data = await getTasks()
        this.ganttData = data
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
    async saveGanttData() {
      await addTasks(this.addedGanttData)
      this.addedGanttData = []

      await updateTasks(this.updatedGanttData)
      this.updatedGanttData = []

      await deleteTasks(this.deletedGanttData)
      this.deletedGanttData = []
    }
  }
})
