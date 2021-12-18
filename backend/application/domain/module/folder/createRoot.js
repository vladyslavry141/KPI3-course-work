async (fields, accountId) => {
  const folder = await domain.entity.Folder.create({
    ...fields,
    creatorId: accountId,
  });

  await domain.entity.Journal.create({
    accountId,
    action: 'create',
    identifierId: folder.folderId,
  });

  return folder;
};
