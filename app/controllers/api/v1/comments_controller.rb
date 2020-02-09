# frozen_string_literal: true

include ActionView::Helpers::DateHelper

class Api::V1::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: @comment
    else
      render json: @comment.errors
    end
  end

  def index
    @comments = Comment.all
    render json: @comments
  end

  def comment_params
    params.permit(:user_email, :user_id, :message, :ticket_id)
  end
end
