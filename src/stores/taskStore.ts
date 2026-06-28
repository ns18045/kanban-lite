import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Task } from '../types/task'
import type { TaskStatus } from '../types/task'

export const useTaskStore = defineStore('tasks', () => {

    const tasks = ref<Task[]>([
        {
            id: crypto.randomUUID(),
            title: 'Learn Vue 3',
            description: 'Basics of Composition API',
            status: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: crypto.randomUUID(),
            title: 'Build Kanban UI',
            description: 'Create columns',
            status: 'inProgress',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: crypto.randomUUID(),
            title: 'Finish project',
            description: 'Submit assignment',
            status: 'done',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ])

    const filterText = ref('')
    const filteredTasks = computed(() => {
        return tasks.value.filter(t => {
            const matchesText =
            t.title.toLowerCase().includes(filterText.value.toLowerCase()) ||
            (t.description ?? '').toLowerCase().includes(filterText.value.toLowerCase())

            return matchesText
        })
    })

    function loadFromStorage() {
        const data = localStorage.getItem('tasks')
        if (!data) return

        tasks.value = JSON.parse(data)
    }
    function saveToStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    watch(
        tasks,
        () => saveToStorage(),
        { deep: true }
    )

    loadFromStorage();

    function moveTask(id: string, direction: 'left' | 'right') {
        const task = tasks.value.find(t => t.id === id)
        if (!task) return

        const order: TaskStatus[] = ['todo', 'inProgress', 'done']

        const currentIndex = order.indexOf(task.status)

        if (direction === 'left' && currentIndex > 0) {
            task.status = order[currentIndex - 1]
        }

        if (direction === 'right' && currentIndex < order.length - 1) {
            task.status = order[currentIndex + 1]
        }

        task.updatedAt = new Date().toISOString()
    }

    function addTask(title: string, description?: string) {
        tasks.value.push({
            id: crypto.randomUUID(),
            title,
            description,
            status: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        })
    }

    function deleteTask(id: string) {
        tasks.value = tasks.value.filter(t => t.id !== id)
    }

    function updateTask(id: string, data: Partial<Task>) {
        const task = tasks.value.find(t => t.id === id)
        if (!task) return

        if (data.title !== undefined) task.title = data.title
        if (data.description !== undefined) task.description = data.description
        if (data.status !== undefined) task.status = data.status

        task.updatedAt = new Date().toISOString()
    }

  return {
    tasks,
    moveTask,
    addTask,
    deleteTask,
    updateTask,
    filterText,
    filteredTasks
  }
})

