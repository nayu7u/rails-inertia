<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

const props = defineProps({
  todos: Array
})

const newTitle = ref('')

function addTodo() {
  if (!newTitle.value.trim()) return
  router.post('/todos', { todo: { title: newTitle.value } }, {
    onSuccess: () => { newTitle.value = '' }
  })
}

function toggleTodo(todo) {
  router.patch(`/todos/${todo.id}`, { todo: { completed: !todo.completed } })
}

function deleteTodo(todo) {
  router.delete(`/todos/${todo.id}`)
}
</script>

<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">📝 TODO リスト</h1>

    <!-- Add form -->
    <form @submit.prevent="addTodo" class="flex gap-2 mb-6">
      <input
        v-model="newTitle"
        type="text"
        placeholder="新しいタスクを入力..."
        class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition"
      >
        追加
      </button>
    </form>

    <!-- Todo list -->
    <ul class="space-y-2">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo)"
          class="w-5 h-5 accent-blue-500 cursor-pointer"
        />
        <span
          :class="['flex-1 text-gray-700', { 'line-through text-gray-400': todo.completed }]"
        >
          {{ todo.title }}
        </span>
        <button
          @click="deleteTodo(todo)"
          class="text-red-400 hover:text-red-600 font-bold transition"
          title="削除"
        >
          ✕
        </button>
      </li>
    </ul>

    <p v-if="todos.length === 0" class="text-center text-gray-400 mt-4">
      タスクがありません。新しいタスクを追加してください！
    </p>

    <!-- Summary -->
    <div v-if="todos.length > 0" class="mt-4 text-sm text-gray-500 text-right">
      {{ todos.filter(t => t.completed).length }} / {{ todos.length }} 完了
    </div>
  </div>
</template>
