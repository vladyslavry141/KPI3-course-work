async (ctx, folderId, { parentId, ...fields }) => {
  if (parentId) {
    const folder = await domain.entity.Folder.get(parentId);
    if (!folder) throw new Error('Folder is not exists', 404);
    await domain.module.permission.check(ctx, folder, 'Folder');
  }

  const folder = await domain.entity.Folder.get(folderId);
  await domain.module.permission.check(ctx, folder, 'Folder');
  const filteredFields = lib.utils.filterFields(fields, ['creatorId']);

  await domain.entity.Folder.update(folderId, {
    ...filteredFields,
    ...(parentId ? { parentId } : {}),
  });

  await domain.entity.Journal.create({
    accountId: ctx.accountId,
    table: 'Folder',
    action: 'write',
    identifier: folderId,
  });

  return true;
};
