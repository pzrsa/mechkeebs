export type Setups = {
  result: [
    {
      id: number;
      title: string;
      imageName: string;
      items: string[];
      creatorId: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
};

export type Setup = {
  result: {
    id: number;
    title: string;
    items: string[];
    creatorId: number;
    createdAt: string;
    updatedAt: string;
  };
};

export interface SetupFormValues {
  title: string;
  items: object[];
}
