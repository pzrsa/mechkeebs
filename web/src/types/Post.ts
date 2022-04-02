import { OptionBase } from "chakra-react-select";

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
  image: File;
  keyboard: {
    name: string;
    keycaps: string;
    switches: string;
    stabilizers: string;
  };
}

export interface SwitchOption extends OptionBase {
  label: string;
  value: string;
}
