async (conditions, accountId) => {
  const folder = await domain.entity.Folder.getOne(['*'], {
    ...conditions,
  });

  if (folder && folder.creatorId !== accountId)
    throw new Error('Insufficient Permission');

  return folder;
};
