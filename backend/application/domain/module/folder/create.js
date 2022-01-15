async (ctx, { parentId, ...fields }) => {
  if (!parentId) throw new Error('Folder is not exists', 404);
  const parentFolder = await domain.entity.Folder.get(parentId);
  if (!parentFolder) throw new Error('Folder is not exists', 404);

  await domain.module.permission.check(ctx, parentFolder, 'Folder');
  const { accountId } = ctx;

  const folderId = await domain.entity.Folder.create({
    ...fields,
    parentId,
    creatorId: accountId,
  });

  await domain.entity.Journal.create({
    accountId,
    table: 'Folder',
    action: 'create',
    identifier: folderId,
  });

  return folderId;
};
