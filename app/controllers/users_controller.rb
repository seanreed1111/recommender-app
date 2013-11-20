class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @users = User.all
    @clusters = Kmeans.new
    points = []
    @users.each do |user|
      points << [user.c1,user.c2,user.c3,user.c4,user.c5,user.c6,user.c7,user.c8,user.c9,user.c10,user.c11,user.c12,user.c13]
    end
    #points = [[4,2,1,3],[4,3,2,2],[4,4,3,1],[1,2,4,4],[1,3,4,0],[1,1,0,0],[3,2,1,2],[3,4,2,1],[4,4,3,2],[0,0,4,4],[0,1,2,0]]
    @clusters = @clusters.cluster(1,points,10)
    center = []
    @clusters.each do |k,v|
      if v.include?([@user.c1,@user.c2,@user.c3,@user.c4,@user.c5,@user.c6,@user.c7,@user.c8,@user.c9,@user.c10,@user.c11,@user.c12,@user.c13])
        center << k
      end
    end
    same_clustered_users = @clusters[center.first].map do |p|
   #same_clustered_users = @clusters[center].map do |p|
      User.find_by(c1: p[0], c2: p[1], c3: p[2], c4: p[3], c5: p[4], c6: p[5], c7: p[6], c8: p[7], c9: p[8], c10: p[9], c11: p[10], c12: p[11], c13: p[12])
    end

    s = same_clustered_users.compact.reject{|x| x.id.to_s  == params[:id]}
    @recommend = s.map{|x| x.username}
  # in_same_cluster = User.find(params[:id])
  
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render action: 'show', status: :created, location: @user }
      else
        format.html { render action: 'new' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:username, :c1, :c2, :c3 , :c4 , :c5 , :c6 , :c7 , :c8 , :c9 , :c10 , :c11 , :c12 , :c13)
    end
end