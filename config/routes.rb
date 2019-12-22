Rails.application.routes.draw do 
  resources :posts do
    resources :notes
  end

  root 'posts#index'

end