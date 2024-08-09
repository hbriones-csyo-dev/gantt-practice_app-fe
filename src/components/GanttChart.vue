<script lang="ts">
import { gantt } from '@dhx/trial-gantt'
import type { Task, Link } from '@dhx/trial-gantt'
import '@dhx/trial-gantt/codebase/dhtmlxgantt.css'
import type { ProjectTaskType } from '@/models/projectTask'
import { useGanttStore } from '@/stores/ganttStore'
import { ganttConfig } from '@/configs/ganttConfig'
import { mapTaskToProjectTaskType } from '@/mappings/mapperManual'
import { mapper } from '@/mappings/mapper'
import type { ProjectTaskLinkType } from '@/models/projectTaskLink'
export default {
  name: 'GanttChart',

  data() {
    return {
      ganttStore: useGanttStore(),
      isLoadingFetch: false,
      isLoadingSave: false
    }
  },

  methods: {
    setupGanttConfig() {
      gantt.templates.parse_date = function (date) {
        return new Date(date)
      }
      gantt.plugins({
        tooltip: true
      })

      gantt.config.row_height = 40
      gantt.config.server_utc = true
      gantt.locale.labels.section_priority = 'Priority'
      gantt.locale.labels.section_status = 'Status'
      gantt.i18n.setLocale('en')

      gantt.config.columns = ganttConfig.ganttChartColumns
      gantt.config.lightbox.sections = ganttConfig.lightboxSections
    },
    setupGanttEvents() {
      //tool tip
      gantt.attachEvent('onGanttReady', function () {
        var tooltips = gantt.ext.tooltips
        tooltips.tooltip.setViewport(gantt.$task_data)
      })

      //add
      gantt.attachEvent('onAfterTaskAdd', (id, task: Task) => {
        //const data: ProjectTaskType = mapTaskToProjectTaskType(task)
        const data: ProjectTaskType = mapper.map<Task, ProjectTaskType>(
          task,
          'Task',
          'ProjectTaskType'
        )

        this.ganttStore.addGanttData(data)

        console.log(JSON.stringify(task, null, 4))
      })

      //update
      gantt.attachEvent('onAfterTaskUpdate', (id, task: Task) => {
        const data: ProjectTaskType = mapTaskToProjectTaskType(task)

        this.ganttStore.updateGanttData(data)

        console.log(JSON.stringify(task, null, 4))
      })

      //delete
      gantt.attachEvent('onAfterTaskDelete', (id, task: Task) => {
        const data: ProjectTaskType = mapTaskToProjectTaskType(task)

        this.ganttStore.deleteGanttData(data)

        console.log(JSON.stringify(task, null, 4))
      })

      //links

      //add
      gantt.attachEvent('onAfterLinkAdd', (id, link) => {
        const data: ProjectTaskLinkType = mapper.map<Link, ProjectTaskLinkType>(
          link,
          'Link',
          'ProjectTaskLinkType'
        )

        //this.ganttStore.addGanttData(data)
        this.ganttStore.addGanttDataLink(data)
        //  console.log(JSON.stringify(link, null, 4))
      })

      //update
      gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
        const data: ProjectTaskLinkType = mapper.map<Link, ProjectTaskLinkType>(
          link,
          'Link',
          'ProjectTaskLinkType'
        )

        //this.ganttStore.addGanttData(data)
        this.ganttStore.updateGanttDataLink(data)
        //  console.log(JSON.stringify(link, null, 4))
      })

      //delete
      gantt.attachEvent('onAfterLinkDelete', (id, link) => {
        const data: ProjectTaskLinkType = mapper.map<Link, ProjectTaskLinkType>(
          link,
          'Link',
          'ProjectTaskLinkType'
        )

        //this.ganttStore.addGanttData(data)
        this.ganttStore.deleteGanttDataLink(data)
        //  console.log(JSON.stringify(link, null, 4))
      })

      //lightbox validation
      gantt.attachEvent('onLightboxSave', (id, task, is_new) => {
        const text: String = task.text

        if (text.length >= 50) {
          gantt.alert('The description cannot be more than 50 characters. Please Try again.')
          return false
        }
        return true
      })
    },
    initGantt() {
      this.setupGanttConfig()
      this.setupGanttEvents()

      gantt.init(this.$refs.ganttContainer as HTMLElement)
    },

    async populateGantt() {
      try {
        this.isLoadingFetch = true

        await this.ganttStore.fetchGanttData()
        if (!this.ganttStore.ganttData) {
          gantt.message({ type: 'error', text: 'Data is empty' })
          throw 'Data is empty'
        }

        gantt.parse(this.ganttStore.ganttData)
      } catch (exception) {
        console.log('Error: ', exception)
      } finally {
        this.isLoadingFetch = false
      }
    },
    async saveGantt() {
      try {
        this.isLoadingSave = true
        await this.ganttStore.saveGanttData()
      } catch (exeption) {
        gantt.message({ type: 'error', text: exeption })
        console.log(exeption)
      } finally {
        this.isLoadingSave = false
      }
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
