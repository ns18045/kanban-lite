<script setup lang="ts">
import type { Task } from '../types/task'
import { useTaskStore } from '../stores/taskStore'
import {
  ArrowLeft,
  ArrowRight,
  Pencil,
  Trash2
} from 'lucide-vue-next'

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
            <div>
                <button
                    @click="store.moveTask(task.id, 'left')"
                    :disabled="task.status === 'todo'"
                >
                    <ArrowLeft :size="18"/>
                </button>

                <button
                    @click="store.moveTask(task.id, 'right')"
                    :disabled="task.status === 'done'"
                >
                    <ArrowRight :size="18"/>
                </button>
            </div>
            <div>
                <button @click="emit('edit', task.id)">
                    <Pencil :size="18"/>
                </button>

                <button @click="emit('delete', task.id)">
                    <Trash2 :size="18" color="red"/>
                </button>
            </div>
        </div>
    </div>
</template>