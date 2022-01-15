async (folderId, fields = ['*']) =>
  await db.pg.row('Folder', fields, { folderId });
