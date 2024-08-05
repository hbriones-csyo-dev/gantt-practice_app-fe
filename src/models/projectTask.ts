export interface ProjectTaskType {
  id: string
  text: string
  start_date: string
  duration: number
  end_date: string
  priority: string
  status: string
  type: string
  parent: string
  progress: number
}

export interface ProjectTaskTypeResponse {
  tasks: ProjectTaskType[]
}
