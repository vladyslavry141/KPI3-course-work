async (bookmarkId, { parentId, ...fields }, accountId) => {
  if (parentId) {
    const folder = await domain.entity.Folder.getOne(['*'], {
      folderId: parentId,
    });

    if (!folder) throw new Error('Folder is not exists');

    if (folder.creatorId !== accountId)
      throw new Error('Insufficient Permission');
  }
  const bookmark = await domain.entity.Bookmark.getOne(['creatorId'], {
    bookmarkId,
  });

  if (!bookmark) throw new Error('Bookmark is not exists');

  if (creatorId !== accountId) throw new Error('Insufficient Permission');

  const updatedBookmark = await domain.entity.Bookmark.update(bookmarkId, {
    ...fields,
    ...(parentId ? { parentId } : {}),
  });

  await domain.entity.Journal.create({
    accountId,
    action: 'write',
    identifierId: bookmarkId,
  });

  return updatedBookmark;
};
