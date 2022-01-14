async (ctx, { token }) => {
  const restored = await ctx.client?.restoreSession(token);
  if (restored) return { status: 'logged', data: { id: ctx.accountId } };
  const data = await domain.module.session.restore(token);
  if (!data) throw new Error('Not logged');
  await ctx.client.startSession(token, data);
  return { status: 'logged', data: { id: data.accountId } };
};
