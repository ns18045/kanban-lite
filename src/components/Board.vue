<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskCard from './TaskCard.vue'

const store = useTaskStore()

const todoTasks = computed(() =>
  store.filteredTasks.filter(t => t.status === 'todo')
)

const inProgressTasks = computed(() =>
  store.filteredTasks.filter(t => t.status === 'inProgress')
)

const doneTasks = computed(() =>
  store.filteredTasks.filter(t => t.status === 'done')
)

defineEmits<{
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
}>()
</script>

<template>
    <div class="board">
        <div class="column todo">
            <h2>Todo</h2>
            <TaskCard
                v-for="task in todoTasks"
                :key="task.id"
                :task="task"
                @edit="$emit('edit', $event)"
                @delete="$emit('delete', $event)"
            />
        </div>

        <div class="column in-progress">
            <h2>In Progress</h2>
            <TaskCard
                v-for="task in inProgressTasks"
                :key="task.id"
                :task="task"
                @edit="$emit('edit', $event)"
                @delete="$emit('delete', $event)"
            />
        </div>

        <div class="column done">
            <h2>Done</h2>
            <TaskCard
                v-for="task in doneTasks"
                :key="task.id"
                :task="task"
                @edit="$emit('edit', $event)"
                @delete="$emit('delete', $event)"
            />
        </div>
    </div>
</template>