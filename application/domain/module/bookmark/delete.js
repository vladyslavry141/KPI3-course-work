async (bookmarkId, accountId) => {
  const bookmark = await domain.entity.Bookmark.getOne(['creatorId'], {
    bookmarkId,
  });

  if (!bookmark) throw new Error('Bookmark is not exists');

  if (creatorId !== accountId) throw new Error('Insufficient Permission');

  domain.entity.Bookmark.delete(bookmarkId);

  await domain.entity.Journal.create({
    accountId,
    action: 'delete',
    identifierId: bookmarkId,
  });
};
