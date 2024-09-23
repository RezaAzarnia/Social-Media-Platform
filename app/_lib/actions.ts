"use server";

import { notFound } from "next/navigation";
import {
  NewUserDetails,
  LoginCredentials,
  AuthenticatedUser,
  Post,
  ProfileType,
} from "../_types";

import { NextResponse } from "next/server";
import { auth, unstable_update } from "./auth";

type PaginationProps = {
  page: number;
  limit: number;
};
interface PostsResult {
  posts: Post[];
  postsCount: number;
}

export async function regsiterUser(
  userValues: NewUserDetails
): Promise<NextResponse> {
  const response = await fetch(`${process.env.API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userValues),
  });
  return await response.json();
}

export async function loginHandler(
  userValues: LoginCredentials
): Promise<Response> {
  const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userValues),
  });
  return response;
}

export async function getMe(): Promise<AuthenticatedUser> {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/user/me?userId=${session?.userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.user;
}

export async function getProfile(
  username: string
): Promise<{ status: number; profile: ProfileType }> {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/user/profile/${username}?userId=${session?.userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function getUsers(): Promise<{ data: ProfileType[] }> {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/user/${session?.userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function updateUser(
  userValues: AuthenticatedUser
): Promise<{ status: number; newUserInfo: AuthenticatedUser }> {
  // console.log(userValues);
  const response = await fetch(
    `${process.env.API_URL}/api/user/profile/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userValues),
    }
  );
  const { newUserInfo, status } = await response.json();
  console.log(newUserInfo);
  if (status === 200) {
    //update the session infos in the server components
    await unstable_update({
      name: newUserInfo.name,
      user: { name: newUserInfo.name },
    });
  }
  return { status, newUserInfo };
}

export async function toggleFollow(followingId: string): Promise<NextResponse> {
  const session = await auth();

  const response = await fetch(`${process.env.API_URL}/api/user/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followerId: session?.userId, followingId }),
  });
  const data = await response?.json();
  return data;
}

export async function getUserActivity({
  selectedActivity,
  username,
  page,
  limit,
}: PaginationProps & { selectedActivity?: string; username?: string }) {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/user/profile/activity/${username}?
     &requestQuery=${selectedActivity}&userId=${session?.userId}&take=${limit}&skip=${page}`
  );
  const data = await response.json();
  return data;
}

export async function search({
  page,
  limit,
  searchValue,
}: PaginationProps & { searchValue?: string }): Promise<PostsResult> {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/post/explore?query=${searchValue}&userId=${session?.userId}&take=${limit}&skip=${page}`
  );
  const data = await response.json();
  return data;
}

export async function deletePost(
  postId: string
): Promise<NextResponse & { postsLength: number }> {
  const response = await fetch(`${process.env.API_URL}/api/post/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  });
  const data = await response.json();
  return data;
}

export async function toggleSavePost(postId: string): Promise<any> {
  const session = await auth();
  const response = await fetch(`${process.env.API_URL}/api/post/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: session?.userId, postId }),
  });
  const data = await response?.json();
  return data;
}
export async function likePostHandler(postId: string): Promise<NextResponse> {
  const session = await auth();
  const response = await fetch(`${process.env.API_URL}/api/post/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: session?.userId, postId }),
  });
  const data = await response?.json();
  return data;
}

export async function getSinglePost(
  postId: string
): Promise<{ post: Post; relatedPosts: Post[] }> {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/post/singlePostInfo/${postId}?userId=${session?.userId}`
  );
  const data = await response.json();
  if (data.status === 404) {
    notFound();
  }

  return data;
}
export async function createNewPost(values: FormData) {
  //added the userId here
  const session = await auth();
  values.append("userId", session?.userId || "");

  const response = await fetch(`${process.env.API_URL}/api/post/create`, {
    method: "POST",
    body: values,
  });

  const data = await response.json();
  return data;
}

export async function getTopTrandsPosts({ limit, page }: PaginationProps) {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/post/topTrends?userId=${session?.userId}&take=${limit}&skip=${page}`
  );
  const data = await response.json();
  return data;
}
// remmebr change this name
export async function getAllPosts({
  page,
  limit,
}: PaginationProps): Promise<PostsResult> {
  const user = await auth();
  const response = await fetch(`
    ${process.env.API_URL}/api/post/all?userId=${user?.userId}&limit=${limit}&page=${page}`);
  const posts = await response.json();
  return posts;
}
export async function getUserSavedPosts({
  page,
  limit,
}: PaginationProps): Promise<PostsResult> {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/post/savedPosts?userId=${session?.userId}&limit=${limit}&page=${page}`
  );
  const savedPosts = await response.json();
  return savedPosts;
}

export async function getRelatedPosts({
  page,
  limit,
  postId,
}: PaginationProps & { postId?: string }): Promise<PostsResult> {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/post/relatedPosts?userId=${session?.userId}&postId=${postId}&limit=${limit}&page=${page}`
  );
  const relatedPosts = await response.json();
  return relatedPosts;
}
