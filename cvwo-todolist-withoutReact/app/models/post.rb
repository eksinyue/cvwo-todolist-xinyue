class Post < ApplicationRecord
    has_many :notes, dependent: :destroy

    validates :task, presence: true,
    length: { minimum: 0 }

    
end
