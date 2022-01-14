async (ctx, { id }) => {
  const account = await domain.entity.Account.get(id, [
    'name',
    'accountId',
    'email',
  ]);
  if (!account) throw new Error('Not found', 404);
  return { data: { account } };
};
