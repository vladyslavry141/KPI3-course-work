async (journalId) => db.pg.delete('Journal', { journalId });
