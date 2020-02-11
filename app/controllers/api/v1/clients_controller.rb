# frozen_string_literal: true

class Api::V1::ClientsController < ApplicationController
  def index
    return unless user.admin?

    @clients = Client.all
    render json: @clients
  end

  private

  def user
    User.find(params[:user_id])
  end
end
