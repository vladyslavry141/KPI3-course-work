async (login, password, email, context) => {
  const hash = await metarhia.metautil.hashPassword(password);
  let account;
  try {
    account = await domain.entity.Account.create({
      login,
      password: hash,
      email,
    });
  } catch (error) {
    console.error(error);
    return { error: 'Invalid data' };
  }
  await domain.module.folder.createRoot(
    { name: account.login },
    account.accountId
  );
  const token = await context.client.startSession();
  return { status: 'success', token };
};
