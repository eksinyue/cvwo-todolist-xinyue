Rails.application.routes.draw do 
  resources :posts do
    resources :notes
  end

  namespace :api do
    resources :todos, only: %i[index show create destroy update]
  end
end