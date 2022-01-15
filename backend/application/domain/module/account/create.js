async (ctx, { login, ...data }) => {
  const [user] = await domain.entity.Account.find({ login }, ['accountId']);
  if (user) {
    throw new Error('Login already exists', 400);
  }
  try {
    const accountId = await domain.entity.Account.create({ login, ...data });
    await domain.module.folder.createRoot(accountId);
    return accountId;
  } catch (error) {
    console.error(error);
    throw new Error('Invalid data', 400);
  }
};
