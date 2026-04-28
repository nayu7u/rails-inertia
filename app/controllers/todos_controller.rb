class TodosController < ApplicationController
  def index
    todos = Todo.order(created_at: :desc)
    render inertia: "Todos/Index", props: {
      todos: todos.map { |todo|
        { id: todo.id, title: todo.title, completed: todo.completed }
      }
    }
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      redirect_to todos_path
    else
      redirect_to todos_path, inertia: { errors: todo.errors.full_messages }
    end
  end

  def update
    todo = Todo.find(params[:id])
    todo.update!(todo_params)
    redirect_to todos_path
  end

  def destroy
    Todo.find(params[:id]).destroy
    redirect_to todos_path
  end

  private

  def todo_params
    params.expect(todo: [ :title, :completed ])
  end
end
