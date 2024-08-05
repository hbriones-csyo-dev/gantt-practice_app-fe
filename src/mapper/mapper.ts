import type { Task } from '@dhx/trial-gantt'
import type { ProjectTaskType } from '@/models/projectTask'

export const mapTaskToProjectTaskType = (task: Task): ProjectTaskType => {
  return {
    id: task.id.toString(),
    text: task.text,
    start_date: task.start_date ? task.start_date.toISOString() : '',
    end_date: task.end_date ? task.end_date.toISOString() : '',
    status: task.status,
    priority: task.priority,
    parent: task.parent ? task.parent.toString() : '',
    duration: task.duration as number,
    type: task.type ? task.type.toString() : 'task',
    progress: task.progress as number
  }
}
