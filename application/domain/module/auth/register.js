async (login, password, email, context) => {
  const hash = await metarhia.metautil.hashPassword(password);
  try {
    await domain.entity.Account.create({ login, password: hash, email });
  } catch (error) {
    console.error(error);
    return { error: 'Invalid data' };
  }
  const token = await context.client.startSession();
  return { status: 'success', token };
};
