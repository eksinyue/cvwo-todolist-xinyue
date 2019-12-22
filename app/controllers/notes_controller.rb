class NotesController < ApplicationController
    def create
        @post = Post.find(params[:post_id])
        @note = @post.notes.create(note_params)
        @notes = @post.notes.all
        redirect_to post_path(@post)
      end
    
      def destroy
		@post = Post.find(params[:post_id])
		@note = @post.notes.find(params[:id])
		@note.destroy

		redirect_to post_path(@post)
    end

    
    private
    def note_params 
        params.require(:note).permit(:subtask, notess_attributes: [:subtask, :id, :_destroy]) 
    end
end