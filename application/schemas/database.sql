CREATE TABLE "Identifier" (
  "id" bigint generated always as identity,
  "categoryId" bigint NULL
);

ALTER TABLE "Identifier" ADD CONSTRAINT "pkIdentifier" PRIMARY KEY ("id");
ALTER TABLE "Identifier" ADD CONSTRAINT "fkIdentifierCategory" FOREIGN KEY ("categoryId") REFERENCES "Identifier" ("id");
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
  "id" bigint NOT NULL,
  "parentId" bigint NOT NULL,
  "name" varchar NOT NULL,
  "accountId" bigint NOT NULL,
  "creatorId" bigint NOT NULL
);

ALTER TABLE "Folder" ADD CONSTRAINT "pkFolder" PRIMARY KEY ("id");
ALTER TABLE "Folder" ADD CONSTRAINT "fkFolderId" FOREIGN KEY ("id") REFERENCES "Identifier" ("id");
ALTER TABLE "Folder" ADD CONSTRAINT "fkFolderParent" FOREIGN KEY ("parentId") REFERENCES "Folder" ("id") ON DELETE CASCADE;
ALTER TABLE "Folder" ADD CONSTRAINT "fkFolderAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
ALTER TABLE "Folder" ADD CONSTRAINT "fkFolderCreator" FOREIGN KEY ("creatorId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
CREATE TABLE "Bookmark" (
  "id" bigint NOT NULL,
  "parentId" bigint NOT NULL,
  "creatorId" bigint NOT NULL,
  "name" varchar(200) NOT NULL,
  "url" varchar(200) NOT NULL,
  "info" varchar(500) NOT NULL
);

ALTER TABLE "Bookmark" ADD CONSTRAINT "pkBookmark" PRIMARY KEY ("id");
ALTER TABLE "Bookmark" ADD CONSTRAINT "fkBookmarkId" FOREIGN KEY ("id") REFERENCES "Identifier" ("id");
ALTER TABLE "Bookmark" ADD CONSTRAINT "fkBookmarkParent" FOREIGN KEY ("parentId") REFERENCES "Folder" ("id") ON DELETE CASCADE;
ALTER TABLE "Bookmark" ADD CONSTRAINT "fkBookmarkCreator" FOREIGN KEY ("creatorId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
CREATE TABLE "Category" (
  "id" bigint NOT NULL,
  "name" varchar NOT NULL,
  "kind" varchar NOT NULL,
  "scope" varchar NOT NULL DEFAULT 'system',
  "store" varchar NOT NULL DEFAULT 'persistent',
  "allow" varchar NOT NULL DEFAULT 'write'
);

ALTER TABLE "Category" ADD CONSTRAINT "pkCategory" PRIMARY KEY ("id");
ALTER TABLE "Category" ADD CONSTRAINT "fkCategoryId" FOREIGN KEY ("id") REFERENCES "Identifier" ("id");
CREATE UNIQUE INDEX "akCategoryName" ON "Category" ("name");
CREATE TABLE "Field" (
  "id" bigint NOT NULL,
  "categoryId" bigint NOT NULL,
  "name" varchar NOT NULL
);

ALTER TABLE "Field" ADD CONSTRAINT "pkField" PRIMARY KEY ("id");
ALTER TABLE "Field" ADD CONSTRAINT "fkFieldId" FOREIGN KEY ("id") REFERENCES "Identifier" ("id");
ALTER TABLE "Field" ADD CONSTRAINT "fkFieldCategory" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE;
CREATE UNIQUE INDEX "akFieldNaturalKey" ON "Field" ("categoryId", "name");
CREATE TABLE "Journal" (
  "journalId" bigint generated always as identity,
  "identifierId" bigint NOT NULL,
  "accountId" bigint NULL,
  "action" varchar NOT NULL,
  "actionDatetime" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "Journal" ADD CONSTRAINT "pkJournal" PRIMARY KEY ("journalId");
ALTER TABLE "Journal" ADD CONSTRAINT "fkJournalIdentifier" FOREIGN KEY ("identifierId") REFERENCES "Identifier" ("id");
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

INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Category" ("id", "name", "kind") VALUES (lastval(), 'Identifier', 'entity');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Identifier'), 'category');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Category" ("id", "name", "kind") VALUES (lastval(), 'Account', 'entity');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Account'), 'login');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Account'), 'email');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Account'), 'password');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Account'), 'createdAt');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Category" ("id", "name", "kind") VALUES (lastval(), 'Folder', 'registry');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Folder'), 'parent');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Folder'), 'name');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Folder'), 'account');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Folder'), 'creator');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Category" ("id", "name", "kind") VALUES (lastval(), 'Bookmark', 'registry');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark'), 'parent');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark'), 'creator');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark'), 'name');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark'), 'url');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark'), 'info');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Category" ("id", "name", "kind") VALUES (lastval(), 'Category', 'registry');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Category'), 'name');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Category'), 'kind');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Category'), 'scope');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Category'), 'store');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Category'), 'allow');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Category" ("id", "name", "kind") VALUES (lastval(), 'Field', 'registry');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Field'), 'category');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Field'), 'name');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Category" ("id", "name", "kind") VALUES (lastval(), 'Journal', 'entity');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Journal'), 'identifier');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Journal'), 'account');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Journal'), 'action');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Journal'), 'actionDatetime');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Category" ("id", "name", "kind") VALUES (lastval(), 'Session', 'entity');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Session'), 'account');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Session'), 'token');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Session'), 'ip');
INSERT INTO "Identifier" DEFAULT VALUES;
INSERT INTO "Field" ("id", "categoryId", "name") VALUES (lastval(), (SELECT "id" FROM "Category" WHERE "name" = 'Session'), 'data');

UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') WHERE "id" = (SELECT "id" FROM "Category" WHERE "name" = 'Identifier');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Identifier') AND "name" = 'category');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') WHERE "id" = (SELECT "id" FROM "Category" WHERE "name" = 'Account');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Account') AND "name" = 'login');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Account') AND "name" = 'email');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Account') AND "name" = 'password');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Account') AND "name" = 'createdAt');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') WHERE "id" = (SELECT "id" FROM "Category" WHERE "name" = 'Folder');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Folder') AND "name" = 'parent');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Folder') AND "name" = 'name');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Folder') AND "name" = 'account');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Folder') AND "name" = 'creator');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') WHERE "id" = (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark') AND "name" = 'parent');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark') AND "name" = 'creator');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark') AND "name" = 'name');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark') AND "name" = 'url');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Bookmark') AND "name" = 'info');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') WHERE "id" = (SELECT "id" FROM "Category" WHERE "name" = 'Category');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') AND "name" = 'name');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') AND "name" = 'kind');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') AND "name" = 'scope');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') AND "name" = 'store');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') AND "name" = 'allow');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') WHERE "id" = (SELECT "id" FROM "Category" WHERE "name" = 'Field');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') AND "name" = 'category');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') AND "name" = 'name');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') WHERE "id" = (SELECT "id" FROM "Category" WHERE "name" = 'Journal');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Journal') AND "name" = 'identifier');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Journal') AND "name" = 'account');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Journal') AND "name" = 'action');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Journal') AND "name" = 'actionDatetime');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Category') WHERE "id" = (SELECT "id" FROM "Category" WHERE "name" = 'Session');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Session') AND "name" = 'account');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Session') AND "name" = 'token');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Session') AND "name" = 'ip');
UPDATE "Identifier" SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Field') WHERE "id" = (SELECT "id" FROM "Field" WHERE "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'Session') AND "name" = 'data');
