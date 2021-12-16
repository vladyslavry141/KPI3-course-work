async (parentId, accountId) => {
  const folderError = new Error('Folder is not exists');

  if (!parentId) throw folderError;

  const folder = await domain.entity.Folder.getOne(['*'], {
    folderId: parentId,
  });

  if (!folder) throw folderError;

  if (folder.creatorId !== accountId)
    throw new Error('Insufficient Permission');

  return domain.entity.Bookmark.getList(parentId);
};
