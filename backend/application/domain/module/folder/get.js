async (ctx, id) => {
  const folder = await domain.entity.Folder.get(id);
  if (!folder) throw new Error('Folder is not exists', 403);
  await domain.module.permission.check(ctx, folder, 'Folder');
  return folder;
};
