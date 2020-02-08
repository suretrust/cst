# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tickets, only: %i[update create show index]
      resources :comments, only: %i[create index]
      resources :users, only: [:create, :show]
      resources :tokens, only: :create
    end
  end

  namespace :v1, defaults: { format: 'json' } do
    get 'things', to: 'things#index'
  end
  get '*page', to: 'statics#index', constraints: lambda { |req|
                                                   !req.xhr? && req.format.html?
                                                 }
  root 'statics#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
