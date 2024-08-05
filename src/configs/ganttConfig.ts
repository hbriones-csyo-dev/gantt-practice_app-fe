import type { Task } from '@dhx/trial-gantt'

const optsPriority = [
  { key: 1, label: 'High' },
  { key: 2, label: 'Normal' },
  { key: 3, label: 'Low' }
]

const optsStatus = [
  { key: 1, label: 'Unstarted' },
  { key: 2, label: 'Delay' },
  { key: 3, label: 'Done' },
  { key: 4, label: 'In Progress' }
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
      default_value: 2
    },
    {
      name: 'status',
      height: 22,
      type: 'select',
      map_to: 'status',
      options: optsStatus,
      default_value: 1
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
      min_width: 150,
      template: (obj: Task) => {
        switch (obj.status) {
          case '1':
            return 'Unstarted'
          case '2':
            return 'Delay'
          case '3':
            return 'Done'
          case '4':
            return 'In Progress'
        }
      }
    },
    {
      name: 'priority',
      label: 'Priority',
      align: 'center',
      template: (obj: Task) => {
        switch (obj.priority) {
          case '1':
            return 'High'
          case '2':
            return 'Normal'
          case '3':
            return 'Low'
        }
      }
    },
    { name: 'duration', label: 'Duration', align: 'center' },

    { name: 'add', label: '', width: 44 }
  ]
}
