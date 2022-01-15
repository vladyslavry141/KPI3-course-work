async (accountId) => {
  const folderId = await domain.entity.Folder.create({
    name: 'Root',
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
