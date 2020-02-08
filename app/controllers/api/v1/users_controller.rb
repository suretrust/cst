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

  private

  def user_params
    params.permit(:email, :password)
  end

  def encode_token(payload = {})
    exp = 24.hours.from_now
    payload[:exp] = exp.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end