<script setup lang="ts">
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()
</script>

<template>
  <div class="filters">
    <input v-model="store.filterText" placeholder="Search..." />
  </div>
</template>