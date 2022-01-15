async (folderId) => await db.pg.delete('Folder', { folderId });
