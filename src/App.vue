<script setup lang="ts">
import { ref } from 'vue'
import Board from './components/Board.vue'
import TaskForm from './components/TaskForm.vue'
import FilterBar from './components/FilterBar.vue'
import { useTaskStore } from './stores/taskStore'
import type { Task } from './types/task'

const store = useTaskStore()

const showForm = ref(false)
const editingId = ref<string | null>(null)
const editingTask = ref<Task | null>(null)

const confirmDeleteId = ref<string | null>(null)

function openNew() {
  editingId.value = null
  editingTask.value = null
  showForm.value = true
}

function editTask(id: string) {
  editingId.value = id
  editingTask.value = store.tasks.find(t => t.id === id) ?? null
  showForm.value = true
}

function save(data: { title: string; description?: string }) {
  if (editingId.value) {
    store.updateTask(editingId.value, data)
  } else {
    store.addTask(data.title, data.description)
  }

  showForm.value = false
}

function askDelete(id: string) {
  confirmDeleteId.value = id
}

function confirmDelete() {
  if (!confirmDeleteId.value) return
  store.deleteTask(confirmDeleteId.value)
  confirmDeleteId.value = null
}

function cancelDelete() {
  confirmDeleteId.value = null
}
</script>

<template>
  <h1>Kanban Lite</h1>

  <button @click="openNew">+ Add task</button>
  <FilterBar />
  <Board @edit="editTask"  @delete="askDelete"/>

  <TaskForm
    :modelValue="showForm"
    :task="editingTask"
    @close="showForm = false"
    @save="save"
  />

  <ConfirmDialog
    :modelValue="confirmDeleteId !== null"
    :taskId="confirmDeleteId"
    @close="cancelDelete"
    @save="confirmDelete"
  />

  <div v-if="confirmDeleteId" class="modal">
    <div class="box">
      <p>Delete task?</p>

      <button @click="cancelDelete">Cancel</button>
      <button @click="confirmDelete">Delete</button>
    </div>
  </div>

</template>