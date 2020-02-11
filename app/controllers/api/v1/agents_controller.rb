# frozen_string_literal: true

class Api::V1::AgentsController < ApplicationController
  def index
    return unless user.admin?

    @agents = Agent.all
    render json: @agents
  end

  private

  def user
    User.find(params[:user_id])
  end
end
