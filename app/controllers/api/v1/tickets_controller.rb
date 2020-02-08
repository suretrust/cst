# frozen_string_literal: true

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
      created_at: (@ticket.created_at.to_f * 1000),
      updated_at: (@ticket.updated_at.to_f * 1000)
    }
  end

  def update; end

  private

  def ticket_params
    params.permit(:title, :message, :status, :user_id, :user_email)
  end
end
