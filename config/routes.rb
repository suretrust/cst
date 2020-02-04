# frozen_string_literal: true

Rails.application.routes.draw do
  resources :users, only: :create
  resources :tokens, only: :create

  namespace :v1, defaults: { format: 'json' } do
    get 'things', to: 'things#index'
  end

  root 'statics#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
