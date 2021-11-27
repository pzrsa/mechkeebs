type Setup = {
  results: [
    {
      id: number;
      title: string;
      items: string[];
      creatorId: number;
      creator: { username: string };
      createdAt: Date;
      updatedAt: Date;
    }
  ];
};

export default Setup;
