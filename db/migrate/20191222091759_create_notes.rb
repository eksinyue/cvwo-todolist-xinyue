class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.string :subtask
      t.references :post, null: false, foreign_key: true
      t.timestamps
    end
  end
end