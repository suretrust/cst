class CreateTickets < ActiveRecord::Migration[6.0]
  def change
    create_table :tickets do |t|
      t.string :title
      t.text :message
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
