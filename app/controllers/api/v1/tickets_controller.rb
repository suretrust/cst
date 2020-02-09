# frozen_string_literal: true

include ActionView::Helpers::DateHelper
class Api::V1::TicketsController < ApplicationController
  def create
    @ticket = Ticket.new(ticket_params)
    if @ticket.save
      render json: @ticket
    else
      render json: @ticket.errors
    end
  end

  def index
    @tickets = Ticket.all
    render json: @tickets
  end

  def show
    @ticket = Ticket.find_by(id: params[:id])
    render json: {
      title: @ticket.title,
      message: @ticket.message,
      status: @ticket.status,
      created_at: time_ago_in_words(@ticket.created_at),
      updated_at: time_ago_in_words(@ticket.updated_at)
    }
  end

  def update
    return unless user.admin? || user.agent?

    @ticket = Ticket.find(params[:id])
    @ticket.update_attributes(status: false)
    render json: @ticket
  end

  private

  def user
    User.find(params[:user_id])
  end

  def ticket_params
    params.permit(:title, :message, :status, :user_id, :user_email)
  end
end
