async (accountId) => db.pg.delete('Account', { accountId });
