export interface User {
  id: number;
  user: {
    id: number;
    twitterUsername: string;
    twitterImageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}
