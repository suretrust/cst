# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      :ok
      render json: {
        jwt: encode_token(id: @user.id, email: @user.email, type: @user.type)
      }
    else
      :bad_request
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    render json: {
      id: @user.id,
      email: @user.email,
      created_at: @user.created_at,
      updated_at: @user.updated_at,
      type: @user.type
    }
  end

  def update
    return unless user.admin?

    @user = User.find(params[:id])
    if update_user_attributes(params)
      render json: { message: 'User updated!' }
    else
      render json: @user.errors
    end
  end

  private

  def update_user_attributes(params)
    if params[:type] == 'Admin'
      @user.update_attributes(type: 'Admin')
      return true
    elsif params[:type] == 'Client'
      @user.update_attributes(type: 'Client')
      return true
    elsif params[:type] == 'Agent'
      @user.update_attributes(type: 'Agent')
      return true
    end
    false
  end

  def user_params
    params.permit(:email, :password, :type)
  end

  def user
    User.find(params[:user_id])
  end
end
