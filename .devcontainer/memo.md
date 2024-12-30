sudo tailscale up -ssh -hostname mac-hono

npx wrangler login
<!-- 以下の方法でmacでしか成功しなかった -->
<!-- https://zenn.dev/frog/articles/f77b80a0d78497 -->
npx wrangler whoami

<!-- webGUIから作成したDBではマイグレーションが効かなかったのでCLIから作成した -->
0. npx wrangler d1 create hono-prisma-db
<!-- マイグレーション（初回） -->
1. npx wrangler d1 migrations create DB {create_imageset_table}
2. npx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script >> ./prisma/migrations/{0001_create_imageset_table.sql}
3. npx wrangler d1 migrations apply DB --local
4. npx wrangler d1 migrations apply DB --remote
テーブル確認. npx wrangler d1 execute DB --local --command "SELECT name FROM sqlite_master WHERE type='table';"

