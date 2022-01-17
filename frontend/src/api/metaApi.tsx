import { Metacom } from 'metacom';

export type ID = string;
export type PageStatus = 'pending' | 'error' | 'load';
export type LogStatus = 'logged' | 'notLogged';

interface CreateResult {
  id: ID;
}

interface UpdateResult {
  updated: boolean;
}

export interface DeleteResult {
  deleted: boolean;
}

export interface GetByResult<T> {
  data: T[];
}
type CreateQuery<T> = (args: T) => Promise<CreateResult>;
type GetQuery<T> = (args: { id: ID }) => Promise<T>;
type UpdateQuery<T> = (args: { id: ID; delta: T }) => Promise<UpdateResult>;
type DeleteQuery = (args: { id: ID }) => Promise<DeleteResult>;
type GetByQuery<T> = (args: { id: ID }) => Promise<GetByResult<T>>;

export type Account = {
  accountId: ID;
  login: string;
  email: string;
};

export type Folder = {
  folderId: ID;
  name: string;
  parentId?: ID;
};

export type Bookmark = {
  bookmarkId: ID;
  name: string;
  url: string;
  info: string;
  parentId?: ID;
};

export type MetaApi = {
  auth: {
    signin: (args: {
      login: string;
      password: string;
    }) => Promise<{ status: LogStatus; token: string; id: string }>;
    restore: (args: {
      token: string;
    }) => Promise<{ status: LogStatus; id: string }>;
    register: (args: {
      login: string;
      password: string;
      email: string;
    }) => Promise<{ status: LogStatus; token: string; id: string }>;
  };
  account: {
    get: GetQuery<{ account: Account }>;
    update: UpdateQuery<Account>;
  };
  bookmark: {
    create: CreateQuery<Omit<Bookmark, 'bookmarkId'>>;
    get: GetQuery<{ bookmark: Bookmark }>;
    update: UpdateQuery<Omit<Bookmark, 'bookmarkId'>>;
    delete: DeleteQuery;
    getByFolder: GetByQuery<Bookmark>;
  };
  folder: {
    create: CreateQuery<Omit<Folder, 'folderId'>>;
    get: GetQuery<{ folder: Folder }>;
    getRoot: () => Promise<{ folder: Folder }>;
    update: UpdateQuery<Omit<Folder, 'folderId'>>;
    delete: DeleteQuery;
    getByFolder: GetByQuery<Folder>;
  };
};

const API_INTERFACES = ['auth', 'account', 'bookmark', 'folder'] as const;

const metaApi = (function () {
  let api: MetaApi | undefined;
  const createInstance = async function () {
    const metacom = Metacom.create('ws://localhost:8001');
    await metacom.load(...API_INTERFACES);
    const api = metacom.api;
    return api as MetaApi;
  };

  return {
    getInstance: async () => {
      if (!api) {
        api = await createInstance();
      }
      return api;
    },
  };
})();

export default metaApi;
