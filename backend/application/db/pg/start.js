async () => {
  if (application.worker.id === 'W1') {
    console.debug('Connect to pg');
  }
  const options = {
    ...config.database,
    console,
    model: application.schemas.model,
  };

  db.pg = new metarhia.metasql.Database(options);

  if (application.worker.id === 'W1') {
    const query = 'SELECT NOW() as date;';
    const {
      rows: [{ date }],
    } = await db.pg.query(query, []);
    console.debug(`Connected to pg at ${date}`);
  }
};
