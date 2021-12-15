async (login, password) => {
  const user = await domain.entity.Account.getOne(['*'], { login });
  if (!user) throw new Error('Incorrect login or password');
  const { accountId, password: hash } = user;
  const valid = await metarhia.metautil.validatePassword(password, hash);
  if (!valid) throw new Error('Incorrect login or password');
  console.log(`Logged user: ${login}`);
  const token = domain.module.utils.generateToken();
  const data = { accountId: user.accountId };
  context.client.startSession(token, data);
  const { ip } = context.client;
  await domain.module.session.start(token, data, { ip, accountId });
  return { status: 'logged', token };
};
