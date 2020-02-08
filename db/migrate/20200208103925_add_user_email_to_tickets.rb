class AddUserEmailToTickets < ActiveRecord::Migration[6.0]
  def change
    add_column :tickets, :user_email, :string
  end
end
