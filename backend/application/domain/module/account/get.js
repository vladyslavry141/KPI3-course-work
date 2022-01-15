async (ctx, id) => {
  const account = await domain.entity.Account.get(id, [
    'accountId',
    'name',
    'accountId',
    'email',
  ]);
  if (!account) throw new Error('Not found', 404);
  await domain.module.permission.check(
    ctx,
    { ...account, creatorId: account.accountId },
    'Account'
  );
  return account;
};
