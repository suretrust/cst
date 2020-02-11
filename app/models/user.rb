class User < ApplicationRecord
  default_scope { order(updated_at: :desc) }

  has_secure_password

  has_many :tickets, dependent: :destroy
  has_many :comments, dependent: :destroy

  def client?
    type == 'Client'
  end

  def admin?
    type == 'Admin'
  end

  def agent?
    type == 'Agent'
  end
end
