Rails.application.routes.draw do
  root to: 'movie#home'
  get '/search', to: 'movie#search', as: :search_movie
end
