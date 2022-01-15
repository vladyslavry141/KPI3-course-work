async (folderId, delta) => await db.pg.update('Folder', delta, { folderId });
