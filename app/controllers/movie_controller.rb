class MovieController < ApplicationController
  def home
    @found_movies = true
    @search_input = "Example"
    @movies = ["Movie 1", "Movie 2"]
  end

  def search
  end

  def nomination
  end

  def delete
  end
end
