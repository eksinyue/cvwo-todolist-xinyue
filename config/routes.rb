Rails.application.routes.draw do 
  resources :posts do
    resources :notes
  end

  root to: redirect('/todos')

  get 'todos', to: 'site#index'
  get 'todos/new', to: 'site#index'
  get 'todos/:id', to: 'site#index'
  get 'todos/:id/edit', to: 'site#index'

  namespace :api do
    resources :todos, only: %i[index show create destroy update]
  end
end