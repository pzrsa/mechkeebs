export interface Posts {
  result: [
    {
      id: number;
      imageName: string;
      createdAt: number;
      keyboard: {
        id: number;
        name: string;
        keycaps: string;
        switches: string;
        createdAt: number;
        updatedAt: null | number;
      };
      creator: {
        id: number;
        twitterUsername: string;
        twitterImageUrl: string;
        createdAt: number;
        updatedAt: null | number;
      };
    }
  ];
  nextCursor: number | null;
}

export interface Post {
  result: {
    id: number;
    imageName: string;
    createdAt: number;
    keyboard: {
      id: number;
      name: string;
      keycaps: string;
      switches: string;
      createdAt: number;
      updatedAt: null | number;
    };
    creator: {
      id: number;
      twitterUsername: string;
      twitterImageUrl: string;
      createdAt: number;
      updatedAt: null | number;
    };
  };
}

export interface SinglePost {
  id: number;
  imageName: string;
  createdAt: number;
  keyboard: {
    id: number;
    name: string;
    keycaps: string;
    switches: string;
    createdAt: number;
    updatedAt: number | null;
  };
  creator: {
    id: number;
    twitterUsername: string;
    twitterImageUrl: string;
    createdAt: number;
    updatedAt: number | null;
  };
}

export interface PostFormValues {
  image: File;
  keyboard: {
    name: string;
    keycaps: string;
    switches: string;
  };
}
