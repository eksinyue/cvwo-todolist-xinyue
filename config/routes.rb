Rails.application.routes.draw do 
  resources :posts do
    resources :notes
  end

  root 'posts#index'
  namespace :api do
    resources :todos, only: %i[index show create destroy update]
  end
end