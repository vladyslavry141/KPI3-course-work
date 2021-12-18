async (token, context) => {
  console.dir({ context });
  const restored = await context.client?.restoreSession(token);
  if (restored) return { status: 'logged' };
  const data = await domain.module.session.restore(token);
  if (!data) return { status: 'not logged' };
  await context.client.startSession(token, data);
  return { status: 'logged' };
};
