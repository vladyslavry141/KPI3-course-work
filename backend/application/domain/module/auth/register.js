async (ctx, { password, ...data }) => {
  const hash = await metarhia.metautil.hashPassword(password);
  let accountId;
  try {
    accountId = await domain.module.account.create(ctx, {
      ...data,
      password: hash,
    });
  } catch (error) {
    console.error(error);
    throw new Error(error.message, 400);
  }
  const token = await ctx.client.startSession();
  return { status: 'success', data: { token, id: accountId } };
};
