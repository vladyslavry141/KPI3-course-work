async ({ id, delta }) =>
  lib.utils.tryReturnObj(
    context,
    (ctx) => domain.module.folder.update(ctx, id, delta),
    'updated'
  );
