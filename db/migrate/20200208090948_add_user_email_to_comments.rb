class AddUserEmailToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :user_email, :string
  end
end
