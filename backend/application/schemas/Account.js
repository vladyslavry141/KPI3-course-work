({
  Entity: {},

  login: { type: 'string', length: { min: 3, max: 30 }, unique: true },
  email: { type: 'string', length: { min: 5, max: 100 } },
  password: { type: 'string', note: 'Password hash' },
  createdAt: { type: 'datetime', default: 'now' },
});
