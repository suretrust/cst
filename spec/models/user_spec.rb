# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe '::associations' do
    it 'has many comments' do
      assc = described_class.reflect_on_association(:comments)
      expect(assc.macro).to eq :has_many
    end

    it 'has many tickets' do
      assc = described_class.reflect_on_association(:tickets)
      expect(assc.macro).to eq :has_many
    end
  end
end
