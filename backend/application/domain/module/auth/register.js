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
  const token = domain.module.utils.generateToken();
  const sessionData = { accountId };
  await ctx.client.startSession(token, sessionData);
  return { status: 'success', token, id: accountId };
};
