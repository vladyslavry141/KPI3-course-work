async (ctx, bookmarkId, { parentId, ...fields }) => {
  if (parentId) {
    const folder = await domain.entity.Folder.get(parentId);
    if (!folder) throw new Error('Folder is not exists', 404);
    await domain.module.permission.check(ctx, folder, 'Folder');
  }

  const bookmark = await domain.entity.Bookmark.get(bookmarkId);
  await domain.module.permission.check(ctx, bookmark, 'Bookmark');
  const filteredFields = lib.utils.filterFields(fields, ['creatorId']);

  await domain.entity.Bookmark.update(bookmarkId, {
    ...filteredFields,
    ...(parentId ? { parentId } : {}),
  });

  await domain.entity.Journal.create({
    accountId: ctx.accountId,
    table: 'Bookmark',
    action: 'write',
    identifier: bookmarkId,
  });

  return true;
};
