class Ticket < ApplicationRecord
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
