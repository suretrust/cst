# frozen_string_literal: true

class Api::V1::AdminsController < ApplicationController
  def index
    return unless user.admin?

    @admins = Admin.all
    render json: @admins
  end

  private

  def user
    User.find(params[:user_id])
  end
end
