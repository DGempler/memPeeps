class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :update, :destroy]

  def index
    @people = Person.all
    render json: @people, status: :ok
  end

  def create
    if params[:image]
      decode_image
    end

    @person = Person.new person_params
    if @person.save
      render json: as_json(@person), status: :created
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  def show
    puts as_json(@person)
    render json: as_json(@person), status: :ok
  end

  def update
    if @person.update person_params
      render json: @person, status: :ok
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @person.destroy
    render json: @person, status: :ok
  end

  private
  def person_params
    params.require(:person).permit(:first_name, :last_name, :image)
  end

  def set_person
    @person = Person.find(params[:id])
  end

  def as_json(options={})
    { first_name: options.first_name, last_name: options.last_name, image: options.image.url(:medium) }
  end

  def decode_image
    # decode base64 string
    Rails.logger.info 'decoding now'
    decoded_data = Base64.decode64(params[:image]) # json parameter set in directive scope
    # create 'file' understandable by Paperclip
    data = StringIO.new(decoded_data)
    data.class_eval do
      attr_accessor :content_type, :original_filename
    end

    # set file properties
    # data.content_type = params[:image] # json parameter set in directive scope
    # data.original_filename = params[:image] # json parameter set in directive scope

    # update hash, I had to set @up to persist the hash so I can pass it for saving
    # since set_params returns a new hash everytime it is called (and must be used to explicitly list which params are allowed otherwise it throws an exception)
    @person[:image] = data # user Icon is the model attribute that i defined as an attachment using paperclip generator
  end

end