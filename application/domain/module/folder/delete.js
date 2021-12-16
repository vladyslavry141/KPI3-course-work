async (folderId, accountId) => {
  const folder = await domain.entity.Folder.getOne(['creatorId'], {
    folderId,
  });

  if (!folder) throw new Error('Folder is not exists');

  if (creatorId !== accountId) throw new Error('Insufficient Permission');

  domain.entity.Folder.delete(bookmarkId);

  await domain.entity.Journal.create({
    accountId,
    action: 'delete',
    identifierId: folderId,
  });
};
