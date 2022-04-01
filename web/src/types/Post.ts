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
        stabilizers: string;
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
      stabilizers: string;
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
  title: string;
  items: object[];
}
