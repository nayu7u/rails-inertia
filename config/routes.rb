Rails.application.routes.draw do
  root "todos#index"
  resources :todos, only: [:index, :create, :update, :destroy]

  get "up" => "rails/health#show", as: :rails_health_check
end
