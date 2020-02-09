# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    message { 'I am the message of the first ticket' }
    association :user, strategy: :create
    association :ticket, strategy: :build
  end
end
