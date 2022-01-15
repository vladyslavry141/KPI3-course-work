({
  Entity: {},

  identifier: 'bigint',
  table: { enum: ['Bookmark', 'Folder'] },
  account: { type: 'Account', required: false, delete: 'set null' },
  action: { enum: ['delete', 'write', 'copy', 'permission'] },
  actionDatetime: { type: 'datetime', default: 'now' },
});
