async (ctx, id) => {
  const bookmark = await domain.entity.Bookmark.get(id);
  if (!bookmark) throw new Error('Bookmark is not exists', 403);
  await domain.module.permission.check(ctx, bookmark, 'Bookmark');

  await domain.entity.Bookmark.delete(id);

  await domain.entity.Journal.create({
    accountId: ctx.accountId,
    table: 'Bookmark',
    action: 'delete',
    identifier: id,
  });

  return true;
};
