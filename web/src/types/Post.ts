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
        username: string;
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
      username: string;
      createdAt: number;
      updatedAt: null | number;
    };
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
