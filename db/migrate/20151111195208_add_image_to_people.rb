class AddImageToPeople < ActiveRecord::Migration
  def self.up
    add_attachment :people, :image
  end

  def self.down
    remove_attachment :people, :image
  end
end
