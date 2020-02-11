# frozen_string_literal: true

class Ticket < ApplicationRecord
  default_scope { order(updated_at: :desc) }

  belongs_to :user
  has_many :comments, dependent: :destroy

  validates :message, :title, presence: true

  scope :recent, -> { where(['created_at > ?', 30.days.ago]) }
  scope :closed, -> { where(status: false) }
  scope :recently_closed, -> { closed.recent }

  def open?
    status
  end

  def closed?
    !status
  end
end
