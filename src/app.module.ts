import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { TorrentModule } from './modules/torrent/torrent.module';
import { PeerModule } from './modules/peer/peer.module';
import { AnnouncerModule } from './modules/announcer/announcer.module';
import { LanguageModule } from './modules/language/language.module';
import { GroupModule } from './modules/group/group.module';
import { ScheduleModule } from '@nestjs/schedule';
import { I18nModule, I18nService, QueryResolver } from 'nestjs-i18n';
import * as path from 'node:path';
import { setI18n } from './helpers/i18n.helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        charset: 'utf8mb4',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        autoSchemaSync: true,
        entities: [`${__dirname}/modules/**/**.entity{.ts,.js}`],
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(process.cwd(), 'src/i18n/'),
        watch: true,
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }],
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    SubcategoryModule,
    TorrentModule,
    PeerModule,
    AnnouncerModule,
    LanguageModule,
    GroupModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly i18n: I18nService) {
    setI18n(i18n);
  }
}
