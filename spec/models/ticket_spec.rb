# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Ticket, type: :model do
  let(:ticket) { build :ticket }

  describe '::associations' do
    it 'belongs to user' do
      assc = described_class.reflect_on_association(:user)
      expect(assc.macro).to eq :belongs_to
    end

    it 'has many comments' do
      assc = described_class.reflect_on_association(:comments)
      expect(assc.macro).to eq :has_many
    end
  end

  describe '::validations' do
    context 'when message is missing' do
      it 'is invalid' do
        ticket.message = nil
        expect(ticket.valid?).to be false
      end
    end

    context 'when message is present' do
      it 'is valid' do
        expect(ticket.valid?).to be true
      end
    end

    context 'when title is missing' do
      it 'is invalid' do
        ticket.title = nil
        expect(ticket.valid?).to be false
      end
    end

    context 'when title is present' do
      it 'is valid' do
        expect(ticket.valid?).to be true
      end
    end
  end
end
