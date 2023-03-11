import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...config,
      entities: [User, Post],
    }),
    PostsModule,
    UsersModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
