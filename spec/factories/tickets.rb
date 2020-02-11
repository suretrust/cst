# frozen_string_literal: true

FactoryBot.define do
  factory :ticket do
    title { 'First ticket' }
    message { 'I am the message of the first ticket' }
    association :user, strategy: :create
  end
end
