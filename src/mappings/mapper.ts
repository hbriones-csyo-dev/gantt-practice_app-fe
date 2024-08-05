import { PojosMetadataMap, pojos } from '@automapper/pojos'
import { createMap, createMapper } from '@automapper/core'
import { forMember } from '@automapper/core'
import { mapFrom } from '@automapper/core'
import type { ProjectTaskType } from '@/models/projectTask'
import type { Task } from '@dhx/trial-gantt'

export const mapper = createMapper({ strategyInitializer: pojos() })

PojosMetadataMap.create<Task>('Task', {
  id: String,
  text: String,
  start_date: String,
  duration: Number,
  end_date: String,
  priority: String,
  status: String,
  type: String,
  parent: String,
  progress: Number
})

PojosMetadataMap.create<ProjectTaskType>('ProjectTaskType', {
  id: String,
  text: String,
  start_date: String,
  duration: Number,
  end_date: String,
  priority: String,
  status: String,
  type: String,
  parent: String,
  progress: Number
})
createMap<Task, ProjectTaskType>(
  mapper,
  'Task', // this needs to match what we passed in PojosMetadataMap.create()
  'ProjectTaskType', // this needs to match what we passed in PojosMetadataMap.create()
  forMember(
    (destination) => destination.id,
    mapFrom((source) => source.id?.toString())
  ),
  forMember(
    (destination) => destination.start_date,
    mapFrom((source) => source.start_date?.toISOString())
  ),
  forMember(
    (destination) => destination.end_date,
    mapFrom((source) => source.end_date?.toISOString())
  ),
  forMember(
    (destination) => destination.parent,
    mapFrom((source) => source.parent?.toString())
  ),
  forMember(
    (destination) => destination.type,
    mapFrom((source) => (source.type ? source.type.toString() : 'task'))
  )
)
