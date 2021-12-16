async ({ parentId, ...fields }, accountId) => {
  const folderError = new Error('Folder is not exists');

  if (!parentId) throw folderError;

  const folder = await domain.entity.Folder.getOne(['*'], {
    folderId: parentId,
  });

  if (!folder) throw folderError;

  if (folder.creatorId !== accountId)
    throw new Error('Insufficient Permission');

  const folder = await domain.entity.Folder.create({
    ...fields,
    parentId,
    creatorId: accountId,
  });

  await domain.entity.Journal.create({
    accountId,
    action: 'create',
    identifierId: folder.folderId,
  });

  return folder;
};
