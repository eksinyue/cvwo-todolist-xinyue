class PostsController < ApplicationController
    def index
        @new_post = Post.new
        @all_posts = Post.order(created_at: :desc).all.includes(:notes)
    end

    def new
        @new_post = Post.new
        @all_posts = Post.order(created_at: :desc).all
    end

    def create 
        @post = Post.new(post_params) 
        if @post.save 
            redirect_to root_path
        else 
            redirect_back(fallback_location: root_path)
        end
    end 
    
    def show
        @post = Post.find(params[:id])
    end

    def edit
        @post = Post.find(params[:id])
    end

    def update
        @post = Post.find(params[:id])
       
        if @post.update(post_params)
          redirect_to @post
        else
          render 'edit'
        end
    end

    def destroy
        @post = Post.find(params[:id])
        @post.destroy
        
        redirect_to posts_path
    end

    private 
    def post_params 
        params.require(:post).permit(:task, posts_attributes: [:task, :id, :_destroy]) 
    end
end
