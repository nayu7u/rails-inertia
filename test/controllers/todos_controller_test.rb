require "test_helper"

class TodosControllerTest < ActionDispatch::IntegrationTest
  test "index returns todos as inertia response" do
    Todo.create!(title: "Test Todo", completed: false)
    get todos_url
    assert_response :success
    assert_includes response.body, "Todos/Index"
    assert_includes response.body, "Test Todo"
  end

  test "create saves a new todo and redirects" do
    assert_difference("Todo.count", 1) do
      post todos_url, params: { todo: { title: "New Task" } },
        headers: { "X-Inertia": "true" }
    end
    assert_redirected_to todos_url
    assert Todo.last.title == "New Task"
    assert_not Todo.last.completed
  end

  test "update toggles completed" do
    todo = Todo.create!(title: "Task", completed: false)
    patch todo_url(todo), params: { todo: { completed: true } },
      headers: { "X-Inertia": "true" }
    assert_redirected_to todos_url
    assert todo.reload.completed
  end

  test "destroy removes a todo" do
    todo = Todo.create!(title: "Task to delete", completed: false)
    assert_difference("Todo.count", -1) do
      delete todo_url(todo), headers: { "X-Inertia": "true" }
    end
    assert_redirected_to todos_url
  end
end
