async ({ password, email, login }) => {
  const {
    rows: [{ accountId }],
  } = await db.pg
    .insert('Account', { password, email, login })
    .returning(['accountId']);
  return accountId;
};
