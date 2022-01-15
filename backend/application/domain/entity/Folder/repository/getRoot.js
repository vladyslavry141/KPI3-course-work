async (accountId) => {
  const query = `
    SELECT * FROM "Folder"
    WHERE "creatorId" = $1
      AND "parentId" IS NULL
  `;
  const {
    rows: [folder],
  } = await db.pg.query(query, [accountId]);
  return folder;
};
