export interface User {
  name:string;
  email:string;
  role: UserRole;
  isBlocked: boolean;
  createdAt: Date;
  postsCount: PostsCount;
}

type UserRole = "ADMIN" | "USER";
export type PostsCount = {
  active: number;
  resolved:number;
  closed: number;
  total: number;
}
