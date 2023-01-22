export type ProjectInterface = {
  id: string;
  increment_id: number;
  name: string;
  description: string;
}

export type ModelUser = {
  userId: string;
  username: string;
  email: string;
  project: [ProjectInterface];
};