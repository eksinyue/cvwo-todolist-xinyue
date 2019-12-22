class Post < ApplicationRecord
    
    validates :task, presence: true,
    length: { minimum: 0 }

end
