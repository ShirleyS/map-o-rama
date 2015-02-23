require 'httparty'
require 'json_builder'
# require 'rubygems'
class WelcomeController < ApplicationController
  include HTTParty
  respond_to :json

	def index
		
		# @response=HTTParty.get('https://api.instagram.com/v1/media/search?lat='+'lat'+'&lng='+'lng'+'&distance=500&client_id=3362b329e39749228f959b78cc3e0d40')
		# dummied the lat long due to local host testing
		
		p @response=HTTParty.get('https://api.instagram.com/v1/media/search?lat=0.0&lng=0.0&distance=200&client_id=3362b329e39749228f959b78cc3e0d40')

	end

end
