async ({ name, parentId, creatorId }) => {
  const data = lib.utils.filterObject({ name, parentId, creatorId }, Boolean);
  return await db.pg
    .insert('Folder', data)
    .returning('folderId')
    .then(({ rows: [{ folderId }] }) => folderId);
};
