async (ctx, { creatorId }, table) => {
  const { accountId } = ctx;
  if (!accountId || accountId !== creatorId)
    throw new Error('Insufficient Permission', 403);
};
