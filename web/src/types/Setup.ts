type Setup = {
  result: {
    id: number;
    title: string;
    items: string[];
    creatorId: number;
    creator: { username: string };
    createdAt: string;
    updatedAt: string;
  };
};

export default Setup;
