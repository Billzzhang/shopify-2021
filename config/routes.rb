Rails.application.routes.draw do
  root to: 'movie#home'
  post '/search', to: 'movie#search', as: :search_movie
  post '/nomination', to: 'movie#nomination', as: :nominate_movie
  post '/delete', to: 'movie#delete', as: :delete_nomination
end
