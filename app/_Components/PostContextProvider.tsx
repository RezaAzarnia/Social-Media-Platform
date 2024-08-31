"use client";
import React, { createContext, useContext, useState } from "react";
import { Post } from "../_types";

type ContextProps = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  postsLength: number;
  setPostsLength: React.Dispatch<React.SetStateAction<number>>;
};
type ChildrenProps = {
  children: React.ReactNode;
};

const PostsContext = createContext<ContextProps | null>(null);

export const PostContextProvider = ({ children }: ChildrenProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLength, setPostsLength] = useState<number>(0);

  return (
    <PostsContext.Provider
      value={{ posts, setPosts, setPostsLength, postsLength }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("context doen't exist");
  }
  return context;
};
