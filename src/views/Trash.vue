<template>
  <div class="page-trash">
    <div class="page-header">
      <h1 class="page-title">回收站</h1>
      <p class="page-desc">这里存放着暂时不需要的事项</p>
    </div>

    <div class="trash-actions" v-if="trashItems.length > 0">
      <el-button
        type="danger"
        text
        size="small"
        @click="clearAll"
        class="clear-btn"
      >
        清空回收站
      </el-button>
    </div>

    <div class="todo-list">
      <TransitionGroup name="slide-up">
        <TodoItem
          v-for="todo in trashItems"
          :key="todo.id"
          :todo="todo"
          :in-trash="true"
        >
          <template #actions>
            <el-button
              type="success"
              text
              size="small"
              @click="restoreTodo(todo.id)"
            >
              恢复
            </el-button>
            <el-button
              type="danger"
              text
              size="small"
              @click="deleteForever(todo.id)"
            >
              彻底删除
            </el-button>
          </template>
        </TodoItem>
      </TransitionGroup>

      <div v-if="trashItems.length === 0" class="empty-state">
        <div class="empty-icon">🗑️</div>
        <p class="empty-text">回收站是空的</p>
        <p class="empty-hint">删除的待办会出现在这里</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getTodos, saveTodos, getTrash, saveTrash } from '../utils/storage'
import TodoItem from '../components/TodoItem.vue'

const trashItems = ref([])

onMounted(() => {
  trashItems.value = getTrash()
})

function restoreTodo(id) {
  const index = trashItems.value.findIndex(t => t.id === id)
  if (index === -1) return

  const [restored] = trashItems.value.splice(index, 1)
  saveTrash(trashItems.value)

  const todos = getTodos()
  todos.unshift(restored)
  saveTodos(todos)

  ElMessage({ message: '已恢复到待办列表', type: 'success', duration: 1500 })
}

function deleteForever(id) {
  ElMessageBox.confirm(
    '彻底删除后无法恢复，确定要删除吗？',
    '确认删除',
    {
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      type: 'warning',
      borderRadius: '16px'
    }
  ).then(() => {
    trashItems.value = trashItems.value.filter(t => t.id !== id)
    saveTrash(trashItems.value)
    ElMessage({ message: '已彻底删除', type: 'info', duration: 1500 })
  }).catch(() => {})
}

function clearAll() {
  ElMessageBox.confirm(
    '清空后所有项目将无法恢复，确定要清空吗？',
    '确认清空',
    {
      confirmButtonText: '确定清空',
      cancelButtonText: '取消',
      type: 'warning',
      borderRadius: '16px'
    }
  ).then(() => {
    trashItems.value = []
    saveTrash(trashItems.value)
    ElMessage({ message: '回收站已清空', type: 'info', duration: 1500 })
  }).catch(() => {})
}
</script>

<style scoped>
.page-trash {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  text-align: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-forest);
  margin-bottom: 8px;
}

.page-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.trash-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.clear-btn {
  font-size: 13px !important;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--color-cream-dark);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 13px;
  color: var(--color-text-light);
}
</style>
