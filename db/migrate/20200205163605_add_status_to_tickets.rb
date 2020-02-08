# frozen_string_literal: true

class AddStatusToTickets < ActiveRecord::Migration[6.0]
  def change
    add_column :tickets, :status, :boolean, default: true
  end
end
