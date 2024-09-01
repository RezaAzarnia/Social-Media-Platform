"use server";

import { notFound, redirect } from "next/navigation";
import {
  NewUserDetails,
  LoginCredentials,
  AuthenticatedUser,
  Post,
} from "../_types";

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth, unstable_update } from "./auth";

type PaginationProps = {
  page: number;
  limit: number;
};

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
  username: string,
  userId: string
): Promise<{ profile: AuthenticatedUser }> {
  const response = await fetch(
    `${process.env.API_URL}/api/user/profile/${username}?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  if (data.status === 404) {
    notFound();
  }
  return data;
}

export async function getUsers(): Promise<{ data: AuthenticatedUser[] }> {
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
  searchValue,
  username,
  page,
  limit,
}: PaginationProps & { searchValue?: string; username?: string }) {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/user/profile/activity/${username}?
     &requestQuery=${searchValue}&userId=${session?.userId}&take=${limit}&skip=${page}`
  );
  const data = await response.json();
  return data;
}

export async function search({
  page,
  limit,
  searchValue,
}: PaginationProps & { searchValue?: string }): Promise<{
  posts: Post[];
  postsCount: number;
}> {
  const response = await fetch(
    `${process.env.API_URL}/api/search?query=${searchValue && searchValue}&take=${limit}&skip=${page}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  return data;
}

export async function getPosts({
  page,
  limit,
}: PaginationProps): Promise<{ posts: Post[]; postsCount: number }> {
  const user = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/post/all?userId=${user?.userId}&take=${limit}&skip=${page}`
  );
  const posts = await response.json();
  return posts;
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
export async function getUserSavedPosts({ page, limit }: PaginationProps) {
  const session = await auth();
  const response = await fetch(
    `${process.env.API_URL}/api/post/savedPosts?userId=${session?.userId}&take=${limit}&skip=${page}`,
    {
      next: {
        tags: ["saved"],
        revalidate: new Date().getSeconds(),
      },
    }
  );
  const savedPosts = await response.json();
  return savedPosts;
}
export async function toggleSavePost(postId: string): Promise<NextResponse> {
  const session = await auth();
  const response = await fetch(`${process.env.API_URL}/api/post/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: session?.userId, postId }),
  });
  const data = await response?.json();
  revalidatePath("saved");

  return data;
}
export async function toggleLikePost(postId: string): Promise<NextResponse> {
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
    `${process.env.API_URL}/api/post/${postId}?userId=${session?.userId}`,
    {
      method: "GET",
      next: { tags: ["singlePost"] },
    }
  );
  const data = await response.json();
  if (data.status === 404) {
    notFound();
  }

  return data;
}
export async function createNewPost(values: FormData) {
  const response = await fetch(`${process.env.API_URL}/api/post/create`, {
    method: "POST",
    body: values,
  });

  const data = await response.json();
  if (data.status === 201) {
    redirect("/");
  }
  return data;
}
