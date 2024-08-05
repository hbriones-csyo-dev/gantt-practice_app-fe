<script lang="ts">
import { Gantt } from '@dhx/trial-gantt'
import type { Task } from '@dhx/trial-gantt'
import '@dhx/trial-gantt/codebase/dhtmlxgantt.css'
import type { ProjectTaskType } from '@/models/projectTask'
import { useGanttStore } from '@/stores/ganttStore'
import { ganttConfig } from '@/configs/ganttConfig'
import { mapTaskToProjectTaskType } from '@/mapper/mapper'
export default {
  name: 'GanttChart',

  data() {
    return {
      ganttInstance: Gantt.getGanttInstance(),
      ganttStore: useGanttStore(),
      isLoadingFetch: false,
      isLoadingSave: false
    }
  },

  methods: {
    setupGanttConfig() {
      this.ganttInstance.templates.parse_date = function (date) {
        return new Date(date)
      }
      this.ganttInstance.config.row_height = 40
      this.ganttInstance.config.server_utc = true
      this.ganttInstance.locale.labels.section_priority = 'Priority'
      this.ganttInstance.locale.labels.section_status = 'Status'
      this.ganttInstance.i18n.setLocale('en')

      this.ganttInstance.config.columns = ganttConfig.ganttChartColumns
      this.ganttInstance.config.lightbox.sections = ganttConfig.lightboxSections
    },
    setupGanttEvents() {
      //add
      this.ganttInstance.attachEvent('onAfterTaskAdd', (id, task: Task) => {
        const data: ProjectTaskType = mapTaskToProjectTaskType(task)

        console.log(id, task)
        console.log(data)

        this.ganttStore.addGanttData(data)
      })

      //update
      this.ganttInstance.attachEvent('onAfterTaskUpdate', (id, task: Task) => {
        const data: ProjectTaskType = mapTaskToProjectTaskType(task)
        this.ganttStore.updateGanttData(data)
      })

      //delete
      this.ganttInstance.attachEvent('onAfterTaskDelete', (id, task: Task) => {
        const data: ProjectTaskType = mapTaskToProjectTaskType(task)
        this.ganttStore.deleteGanttData(data)

        // this.ganttStore.deleteGanttData(data)
      })
    },
    initGantt() {
      this.setupGanttConfig()
      this.setupGanttEvents()

      this.ganttInstance.init(this.$refs.ganttContainer as HTMLElement)
    },

    async populateGantt() {
      this.isLoadingFetch = true
      await this.ganttStore.fetchGanttData()
      console.log(this.ganttStore.ganttData)
      this.ganttInstance.parse(this.ganttStore.ganttData)
      this.isLoadingFetch = false
    },
    async saveGantt() {
      this.isLoadingSave = true
      await this.ganttStore.saveGanttData()
      this.isLoadingSave = false
    }
  },

  mounted() {
    this.initGantt()
  }
}
</script>

<template>
  <div>
    <div class="buttonsContainer">
      <h1>GanttChart</h1>
      <div>
        <button
          v-on:click="populateGantt"
          :disabled="isLoadingFetch"
          v-bind:style="{ 'font-size': 36 + 'px', margin: 10 + 'px' }"
        >
          Get Data
        </button>
        <button
          v-on:click="saveGantt"
          :disabled="isLoadingSave"
          v-bind:style="{ 'font-size': 36 + 'px', margin: 10 + 'px' }"
        >
          Save Data
        </button>
      </div>
    </div>
    <div ref="ganttContainer" class="gantt-container"></div>
  </div>
</template>

<style>
.buttonsContainer {
  display: flex;
  justify-content: space-between;
}
.gantt-container {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
}
</style>
