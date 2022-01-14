async (ctx, { login, password }) => {
  const [user] = await domain.entity.Account.find({ login });
  if (!user) throw new Error('Incorrect login or password', 400);
  const { accountId, password: hash } = user;
  const valid = await metarhia.metautil.validatePassword(password, hash);
  if (!valid) throw new Error('Incorrect login or password', 400);
  console.log(`Logged user: ${login}`);
  const token = domain.module.utils.generateToken();
  const data = { accountId: user.accountId };
  ctx.client.startSession(token, data);
  const { ip } = ctx.client;
  await domain.module.session.start(token, data, { ip, accountId });
  return { status: 'logged', data: { token, id: user.accountId } };
};
