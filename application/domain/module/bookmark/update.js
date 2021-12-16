async (folderId, { parentId, ...fields }, accountId) => {
  if (parentId) {
    const folder = await domain.entity.Folder.getOne(['*'], {
      folderId: parentId,
    });

    if (!folder) throw new Error('Folder is not exists');

    if (folder.creatorId !== accountId)
      throw new Error('Insufficient Permission');
  }
  const folder = await domain.entity.Folder.getOne(['creatorId'], {
    folderId,
  });

  if (!folder) throw new Error('Folder is not exists');

  if (folder.creatorId !== accountId)
    throw new Error('Insufficient Permission');

  const updatedFolder = await domain.entity.Folder.update(folderId, {
    ...fields,
    ...(parentId ? { parentId } : {}),
  });

  await domain.entity.Journal.create({
    accountId,
    action: 'write',
    identifierId: folderId,
  });

  return updatedFolder;
};
