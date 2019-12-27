class Api::TodosController < ApplicationController
    respond_to :json
  
    def index
      respond_with Todo.order(todo_date: :DESC)
    end
  
    def show
      respond_with Todo.find(params[:id])
    end
  
    def create
      respond_with :api, Todo.create(todo_params)
    end
  
    def destroy
      respond_with Todo.destroy(params[:id])
    end
  
    def update
      todo = Todo.find(params['id'])
      todo.update(todo_params)
      respond_with Todo, json: todo
    end
  
    private
  
    def todo_params
      params.require(:todo).permit(
        :id,
        :todo_type,
        :todo_date,
        :title,
        :description,
        :done
      )
    end
  end