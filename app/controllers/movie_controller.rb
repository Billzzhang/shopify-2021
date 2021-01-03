class MovieController < ApplicationController

  def home
    @found_movies = true
    @search_input = "Example"
    @movies = ["Movie 1", "Movie 2"]
  end

  def search
    
    api_key = ENV['API_KEY']
    omdb_url = ENV['OMDB_URL']

    title = params[:title]
    url = omdb_url+"?apikey="+api_key+"&s="+title
    response = HTTParty.get(url)

    render json: response
  end

  def nomination
  end

  def delete
  end
end
