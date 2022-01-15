interface Account {
  accountId: number;
  login: string;
  email: string;
  password: string;
  createdAt: string;
}

interface Folder {
  folderId: number;
  parentId?: number;
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

interface Journal {
  journalId: number;
  identifier: string;
  table: string;
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
