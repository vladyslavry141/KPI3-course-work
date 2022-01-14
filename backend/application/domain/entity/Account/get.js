async (accountId, fields = ['*']) =>
  db.pg.row('Account', fields, { accountId });
