# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      :ok
    else
      :bad_request
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end
