// interface BaseData {
//   id: string;
// }

// interface DataBase<T extends BaseData> {
//   set(value: T): void;
//   get(id: number): T | undefined;
// }

interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export { User };
