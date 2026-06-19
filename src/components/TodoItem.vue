<template>
  <div class="todo-item" :class="{ completed: todo.completed, 'in-trash': inTrash }">
    <div class="todo-checkbox" @click="$emit('toggle')">
      <div class="checkbox-inner" :class="{ checked: todo.completed }">
        <svg v-if="todo.completed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
    <div class="todo-content">
      <span class="todo-text" :class="{ 'text-done': todo.completed }">{{ todo.text }}</span>
      <span class="todo-time">{{ formatTime(todo.createdAt) }}</span>
    </div>
    <div class="todo-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  },
  inTrash: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])

function formatTime(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${month}月${day}日 ${hours}:${minutes}`
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
  cursor: default;
}

.todo-item:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.todo-item.completed {
  opacity: 0.75;
}

.todo-item.in-trash {
  border: 2px dashed var(--color-malt);
  background: rgba(255, 255, 255, 0.7);
}

.todo-checkbox {
  flex-shrink: 0;
  cursor: pointer;
  padding: 4px;
}

.checkbox-inner {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid var(--color-green-mid);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  color: transparent;
}

.checkbox-inner:hover {
  border-color: var(--color-green-accent);
  background: var(--color-green-light);
}

.checkbox-inner.checked {
  background: var(--color-green-accent);
  border-color: var(--color-green-accent);
  color: white;
}

.checkbox-inner svg {
  width: 14px;
  height: 14px;
}

.todo-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.todo-text {
  font-size: 15px;
  color: var(--color-text-primary);
  transition: var(--transition);
  word-break: break-word;
}

.todo-text.text-done {
  text-decoration: line-through;
  text-decoration-color: var(--color-green-mid);
  text-decoration-thickness: 2px;
  color: var(--color-text-light);
}

.todo-time {
  font-size: 12px;
  color: var(--color-text-light);
}

.todo-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.todo-actions :deep(.el-button) {
  border-radius: 10px !important;
  font-size: 13px !important;
}
</style>
