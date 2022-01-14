async (ctx, { login, ...data }) => {
  const [user] = await domain.entity.Account.find({ login }, ['accountId']);
  if (user) {
    throw new Error('Login already exists', 400);
  }
  try {
    return domain.entity.Account.create({ login, ...data });
  } catch (error) {
    console.error(error);
    throw new Error('Invalid data', 400);
  }
};
