# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:comment) { build :comment }

  describe '::associations' do
    it 'belongs to user' do
      assc = described_class.reflect_on_association(:user)
      expect(assc.macro).to eq :belongs_to
    end

    it 'belongs to ticket' do
      assc = described_class.reflect_on_association(:ticket)
      expect(assc.macro).to eq :belongs_to
    end
  end

  describe '::validations' do
    context 'when message is missing' do
      it 'is invalid' do
        comment.message = nil
        expect(comment.valid?).to be false
      end
    end

    context 'when message is present' do
      it 'is valid' do
        expect(comment.valid?).to be true
      end
    end
  end
end
