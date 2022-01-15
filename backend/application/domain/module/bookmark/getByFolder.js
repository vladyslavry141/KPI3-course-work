async (ctx, parentId) => {
  if (!parentId) throw new Error('Folder is not exists', 404);
  const folder = await domain.entity.Folder.get(parentId);
  if (!folder) throw new Error('Folder is not exists', 404);
  await domain.module.permission.check(ctx, folder, 'Folder');

  return domain.entity.Bookmark.find({ parentId });
};
