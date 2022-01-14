async ( accountId, delta ) => db.pg.update('Account', delta, { accountId });
