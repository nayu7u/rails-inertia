import { useForm, router } from "@inertiajs/react";

export default function TodosIndex({ todos }) {
  const { data, setData, post, processing, reset } = useForm({ title: "" });

  function handleSubmit(e) {
    e.preventDefault();
    post("/todos", {
      onSuccess: () => reset("title"),
    });
  }

  function handleToggle(todo) {
    router.patch(`/todos/${todo.id}`, { completed: !todo.completed });
  }

  function handleDelete(todo) {
    router.delete(`/todos/${todo.id}`, {
      onBefore: () => confirm(`「${todo.title}」を削除しますか？`),
    });
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        TODOリスト
      </h1>

      {/* 新規作成フォーム */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData("title", e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          disabled={processing}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg disabled:opacity-50 transition"
        >
          追加
        </button>
      </form>

      {/* TODOリスト */}
      {todos.length === 0 ? (
        <p className="text-center text-gray-400">タスクがありません。</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
                className="w-5 h-5 accent-blue-500 cursor-pointer"
              />
              <span
                className={`flex-1 text-gray-800 ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => handleDelete(todo)}
                className="text-red-400 hover:text-red-600 transition font-bold text-lg leading-none"
                aria-label="削除"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 統計 */}
      {todos.length > 0 && (
        <p className="mt-6 text-sm text-gray-400 text-right">
          {todos.filter((t) => t.completed).length} / {todos.length} 完了
        </p>
      )}
    </div>
  );
}
