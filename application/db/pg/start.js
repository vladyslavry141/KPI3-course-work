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
};
