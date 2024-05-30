export interface IsUserLikes{
    userId: string,
    createdAt: Date
  }


export interface UserPostType {
    _id: string,
    username: string,
    image: string,
    description: string,
    likes: number,
    LikedUser: IsUserLikes[]
}