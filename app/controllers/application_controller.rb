# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery except: :create

  private

  def encode_token(payload = {})
    exp = 24.hours.from_now
    payload[:exp] = exp.to_i
    JWT.encode(payload, ENV['SECRET_KEY_BASE'])
  end
end
