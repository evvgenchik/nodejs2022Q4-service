import { BaseData, DataBase, User } from './interfaces';

class InMemoryDatabase<T extends BaseData> implements DataBase<T> {
  private db: Record<string, T> = {};

  set(value: T): void {
    this.db[value.id] = value;
  }
  get(id: number): T | undefined {
    return this.db[id];
  }
}

const DB = {
  users: new InMemoryDatabase<User>(),
};

export default DB;

// type UsersDB = User[];

// let DB: UsersDB = [];

// const bdRequest = async () => {
//   const data: UsersDB = [];
//   return new Promise((resolve) => {
//     http.get('http://localhost:4999', (res) => {
//       res.setEncoding('utf8');

//       res
//         .on('data', (chunk) => {
//           data.push(chunk);

//           res.on('end', () => {
//             resolve(data);
//           });
//         })
//         .on('error', (err) => {
//           console.log(`Error:   ${err}`);
//         });
//     });
//   });
// };
// const bdPost = async (users: UsersDB) => {
//   const options = {
//     port: 4999,
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   const req = http.request(options);
//   req.write(JSON.stringify(users));
// };

// const dbServer = http.createServer((req, res) => {
//   if (req.method === 'GET') {
//     res.statusCode = 200;
//     res.write(JSON.stringify(DB));
//     res.end();
//   }

//   if (req.method === 'POST' || req.method === 'PUT') {
//     req.setEncoding('utf-8');
//     DB.splice(0, DB.length);
//     req.on('data', (chunk) => {
//       const user = JSON.parse(chunk);
//       // DB.push(user);
//       DB = user;
//     });

//     req.on('end', () => {
//       console.log('No more data');
//     });
//   }
// });

// export { bdRequest, bdPost, dbServer };
