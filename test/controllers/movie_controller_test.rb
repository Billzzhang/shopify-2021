require "test_helper"

class MovieControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get movie_home_url
    assert_response :success
  end
end
