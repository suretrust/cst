class TicketsPdf < Prawn::Document
  def initialize(tickets)
    super(top_margin: 60)
    @tickets = tickets
    @test = nil
    pdf_title
    line_items
  end

  private

  def pdf_title
    text "Processed tickets from #{30.days.ago.strftime('%B %d, %Y')} till present", size: 18, style: :bold, align: :center
  end

  def line_items
    move_down 40
    table(line_items_rows) do
      row(0).font_style = :bold
      self.header = true
    end
  end

  def line_items_rows
    [['S/N', 'Ticket title', "Client's Name", 'Ticket Message']] + ticket_details
  end

  def ticket_details
    @test = @tickets.each_with_index.map { |ticket, index| [index + 1, ticket.title, ticket.user.email, ticket.message] }
  end
end