async ({ data, ...insertData }) => {
  const record = { data: JSON.stringify(data), ...insertData };
  await db.pg.insert('Session', record);
};
