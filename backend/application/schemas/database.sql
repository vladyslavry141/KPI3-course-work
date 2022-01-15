CREATE TABLE "Account" (
  "accountId" bigint generated always as identity,
  "login" varchar(30) NOT NULL,
  "email" varchar(100) NOT NULL,
  "password" varchar NOT NULL,
  "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "Account" ADD CONSTRAINT "pkAccount" PRIMARY KEY ("accountId");
CREATE UNIQUE INDEX "akAccountLogin" ON "Account" ("login");
CREATE TABLE "Folder" (
  "folderId" bigint generated always as identity,
  "parentId" bigint NULL,
  "creatorId" bigint NOT NULL,
  "name" varchar NOT NULL
);

ALTER TABLE "Folder" ADD CONSTRAINT "pkFolder" PRIMARY KEY ("folderId");
ALTER TABLE "Folder" ADD CONSTRAINT "fkFolderParent" FOREIGN KEY ("parentId") REFERENCES "Folder" ("folderId") ON DELETE CASCADE;
ALTER TABLE "Folder" ADD CONSTRAINT "fkFolderCreator" FOREIGN KEY ("creatorId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
CREATE TABLE "Bookmark" (
  "bookmarkId" bigint generated always as identity,
  "parentId" bigint NOT NULL,
  "creatorId" bigint NOT NULL,
  "name" varchar(200) NOT NULL,
  "url" varchar(200) NOT NULL,
  "info" varchar(500) NOT NULL
);

ALTER TABLE "Bookmark" ADD CONSTRAINT "pkBookmark" PRIMARY KEY ("bookmarkId");
ALTER TABLE "Bookmark" ADD CONSTRAINT "fkBookmarkParent" FOREIGN KEY ("parentId") REFERENCES "Folder" ("folderId") ON DELETE CASCADE;
ALTER TABLE "Bookmark" ADD CONSTRAINT "fkBookmarkCreator" FOREIGN KEY ("creatorId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
CREATE TABLE "Journal" (
  "journalId" bigint generated always as identity,
  "identifier" bigint NOT NULL,
  "table" varchar NOT NULL,
  "accountId" bigint NULL,
  "action" varchar NOT NULL,
  "actionDatetime" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "Journal" ADD CONSTRAINT "pkJournal" PRIMARY KEY ("journalId");
ALTER TABLE "Journal" ADD CONSTRAINT "fkJournalAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE SET NULL;
CREATE TABLE "Session" (
  "sessionId" bigint generated always as identity,
  "accountId" bigint NOT NULL,
  "token" varchar NOT NULL,
  "ip" inet NOT NULL,
  "data" jsonb NOT NULL
);

ALTER TABLE "Session" ADD CONSTRAINT "pkSession" PRIMARY KEY ("sessionId");
ALTER TABLE "Session" ADD CONSTRAINT "fkSessionAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId");
CREATE UNIQUE INDEX "akSessionToken" ON "Session" ("token");