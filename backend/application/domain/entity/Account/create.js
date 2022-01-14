async ({ name, password, email, login }) => {
  const {
    rows: [{ accountId }],
  } = await db.pg
    .insert('Account', { name, password, email, login })
    .returning(['accountId']);
  return accountId;
};
