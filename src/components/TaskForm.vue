<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '../types/task'

const props = defineProps<{
  modelValue: boolean
  task?: Task | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: { title: string; description?: string }): void
}>()

const title = ref('')
const description = ref('')

watch(
  () => props.task,
  (t) => {
    title.value = t?.title ?? ''
    description.value = t?.description ?? ''
  },
  { immediate: true }
)

function save() {
  if (!title.value.trim()) return
  emit('save', {
    title: title.value,
    description: description.value
  })
}
</script>

<template>
  <div v-if="modelValue" class="modal">
    <div class="box">
      <h3>{{ task ? 'Edit task' : 'New task' }}</h3>

      <input v-model="title" placeholder="Title" />
      <textarea v-model="description" placeholder="Description" />

      <div class="actions">
        <button @click="emit('close')">Cancel</button>
        <button @click="save">Save</button>
      </div>
    </div>
  </div>
</template>