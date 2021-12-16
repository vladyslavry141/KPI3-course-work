async (conditions, accountId) => {
  const bookmark = await domain.entity.Bookmark.getOne(['*'], {
    ...conditions,
  });

  if (bookmark && bookmark.creatorId !== accountId)
    throw new Error('Insufficient Permission');

  return bookmark;
};
