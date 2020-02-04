# frozen_string_literal: true

class V1::ThingsController < ApplicationController
  def index
    render json: { things: [
      name: 'Name',
      author: 'Author'
    ] }.to_json
  end
end
