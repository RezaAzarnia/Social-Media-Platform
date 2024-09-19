export type LoginCredentials = {
  email: string;
  password: string;
  id?: string;
};
export type NewUserDetails = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type AuthenticatedUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  password: string;
  isFollowing?: boolean;
};
export type HttpResposne = {
  status: number;
  message: string;
};

export type Post = {
  id: string;
  caption: string;
  imageUrl: string;
  createdAt: Date;
  location: string;
  hashtags: string;
  creator: { username: string; name: string };
  _count: { likes: number };
  isLiked: boolean;
  isSaved: boolean;
  creatorId: string;
};

export type LikeResponse = {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
};

export type ProfileType = {
  id: string;
  bio: string;
  email: string;
  isCurrentUserProfile: boolean;
  isFollowing: boolean;
  name: string;
  password: string;
  username: string;
  _count: Record<string, number>;
  // _count: { posts: 1; followers: 0; following: 1 };
};
