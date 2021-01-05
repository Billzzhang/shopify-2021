class MovieController < ApplicationController

  def home
  end

  def search
    
    api_key = ENV['API_KEY']
    omdb_url = ENV['OMDB_URL']

    title = params[:title]
    url = omdb_url+"?apikey="+api_key+"&s="+title
    response = HTTParty.get(url)

    render json: response
  end
end
