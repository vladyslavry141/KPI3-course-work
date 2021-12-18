interface Identifier {
  identifierId: number;
  categoryId?: number;
}

interface Account {
  accountId: number;
  login: string;
  email: string;
  password: string;
  createdAt: string;
}

interface Folder {
  folderId: number;
  parentId: number;
  creatorId: number;
  name: string;
}

interface Bookmark {
  bookmarkId: number;
  parentId: number;
  creatorId: number;
  name: string;
  url: string;
  info: string;
}

interface Category {
  categoryId: number;
  name: string;
  kind: string;
  scope: string;
  store: string;
  allow: string;
}

interface Field {
  fieldId: number;
  categoryId: number;
  name: string;
}

interface Journal {
  journalId: number;
  identifierId: number;
  accountId?: number;
  action: string;
  actionDatetime: string;
}

interface Session {
  sessionId: number;
  accountId: number;
  token: string;
  ip: string;
  data: string;
}
