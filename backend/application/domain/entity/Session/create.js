async (token, data, fields = {}) => {
  const record = { token, data: JSON.stringify(data), ...fields };
  await db.pg.insert('Session', record);
};
