class TodosController < ApplicationController
  def index
    todos = Todo.order(created_at: :desc)
    render inertia: "Todos/Index", props: {
      todos: todos.map { |t| { id: t.id, title: t.title, completed: t.completed } }
    }
  end

  def create
    todo = Todo.new(todo_params)
    todo.save!
    redirect_to todos_path
  end

  def update
    todo = Todo.find(params[:id])
    todo.update!(todo_params)
    redirect_to todos_path
  end

  def destroy
    Todo.find(params[:id]).destroy!
    redirect_to todos_path
  end

  private

  def todo_params
    params.expect(todo: [ :title, :completed ])
  end
end
