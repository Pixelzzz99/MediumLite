import { Post } from './post.interface';

export interface User {
  id: number;
  email: string;
  password: number;
  posts: Post[];
}
