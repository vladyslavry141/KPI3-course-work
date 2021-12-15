({
  Entity: {},

  identifier: 'Identifier',
  account: { type: 'Account', required: false, delete: 'set null' },
  action: { enum: ['delete', 'write', 'copy', 'permission'] },
  actionDatetime: { type: 'datetime', default: 'now' },
});
