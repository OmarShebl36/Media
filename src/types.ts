export interface User {
  id: number;
  name: string;
};

export interface Album {
    id: number;
    title: string;
    userId: number;
}