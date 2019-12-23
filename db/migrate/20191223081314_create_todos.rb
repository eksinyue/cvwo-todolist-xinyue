class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :todo_type
      t.date :todo_date
      t.boolean :done

      t.timestamps
    end
  end
end
