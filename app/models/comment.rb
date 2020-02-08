# frozen_string_literal: true

class Comment < ApplicationRecord
  validates :message, presence: true

  belongs_to :user
  belongs_to :ticket
end
