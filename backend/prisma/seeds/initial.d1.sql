-- サンプルデータの挿入
INSERT INTO am_users (id, email, name, updatedAt) VALUES ('11111111-1111-1111-1111-111111111111', 'user1@example.com', 'User One', CURRENT_TIMESTAMP);
INSERT INTO am_users (id, email, name, updatedAt) VALUES ('22222222-2222-2222-2222-222222222222', 'user2@example.com', 'User Two', CURRENT_TIMESTAMP);

INSERT INTO dm_image_sets (id, name, ownerId, updatedAt) VALUES ('33333333-3333-3333-3333-333333333333', 'ImageSet One', '11111111-1111-1111-1111-111111111111', CURRENT_TIMESTAMP);
INSERT INTO dm_image_sets (id, name, ownerId, updatedAt) VALUES ('44444444-4444-4444-4444-444444444444', 'ImageSet Two', '11111111-1111-1111-1111-111111111111', CURRENT_TIMESTAMP);