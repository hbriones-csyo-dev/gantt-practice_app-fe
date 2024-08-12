import type { Task } from '@dhx/trial-gantt'

const optsPriority = [
  { key: 'High', label: 'High' },
  { key: 'Normal', label: 'Normal' },
  { key: 'Low', label: 'Low' }
]

const optsStatus = [
  { key: 'Unstarted', label: 'Unstarted' },
  { key: 'Delay', label: 'Delay' },
  { key: 'Done', label: 'Done' },
  { key: 'In Progress', label: 'In Progress' }
]

export const ganttConfig = {
  lightboxSections: [
    { name: 'description', height: 38, type: 'textarea', map_to: 'text', focus: true },
    {
      name: 'priority',
      height: 22,
      type: 'select',
      map_to: 'priority',
      options: optsPriority,
      default_value: 'Normal'
    },
    {
      name: 'status',
      height: 22,
      type: 'select',
      map_to: 'status',
      options: optsStatus,
      default_value: 'Unstarted'
    },
    { name: 'time', height: 72, type: 'duration', map_to: 'auto' }
  ],

  ganttChartColumns: [
    { name: 'text', label: 'Task name', width: '*', min_width: 150, max_width: 300, tree: true },
    { name: 'start_date', label: 'Start time', align: 'center', min_width: 80 },
    {
      name: 'status',
      label: 'Status',
      align: 'center',
      min_width: 150
    },
    {
      name: 'priority',
      label: 'Priority',
      align: 'center'
    },
    { name: 'duration', label: 'Duration', align: 'center' },

    { name: 'add', label: '', width: 44 }
  ]
}
