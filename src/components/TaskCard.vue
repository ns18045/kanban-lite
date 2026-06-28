<script setup lang="ts">
import type { Task } from '../types/task'
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()

const emit = defineEmits<{
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
}>()

defineProps<{
  task: Task
}>()
</script>

<template>
    <div class="card">
        <h3>{{ task.title }}</h3>
        <p v-if="task.description">{{ task.description }}</p>
        <div class="actions">
            <button
                @click="store.moveTask(task.id, 'left')"
                :disabled="task.status === 'todo'"
            >
                ←
            </button>

            <button
                @click="store.moveTask(task.id, 'right')"
                :disabled="task.status === 'done'"
            >
                →
            </button>

            <button @click="emit('edit', task.id)">✏️</button>

            <button @click="emit('delete', task.id)">🗑</button>
        </div>
    </div>
</template>