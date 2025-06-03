import { PetPost } from "@/interface";
import { create, StateCreator } from "zustand";

interface UserPostsState {
  posts: PetPost[];
  setPosts: (posts: PetPost[]) => void;
  addPost: (post: PetPost) => void;
  updatePost: (updatedPost: PetPost) => void;
}

const storeApi: StateCreator<UserPostsState> = (set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      ),
    })),
});

export const useUserPostStore = create<UserPostsState>(storeApi);
