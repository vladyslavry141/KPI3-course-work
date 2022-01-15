async (ctx, { parentId, ...fields }) => {
  if (!parentId) throw new Error('Folder is not exists', 404);
  const folder = await domain.entity.Folder.get(parentId);
  if (!folder) throw new Error('Folder is not exists', 404);
  await domain.module.permission.check(ctx, folder, 'Folder');

  const { accountId } = ctx;
  const bookmarkId = await domain.entity.Bookmark.create({
    ...fields,
    parentId,
    creatorId: accountId,
  });

  await domain.entity.Journal.create({
    accountId,
    action: 'create',
    table: 'Bookmark',
    identifier: bookmark.bookmarkId,
  });

  return bookmarkId;
};
