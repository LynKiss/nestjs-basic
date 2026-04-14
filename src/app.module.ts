import { Module } from '@nestjs/common';



import { ThrottlerModule } from '@nestjs/throttler';



import { AppController } from './app.controller';



import { AppService } from './app.service';



import { MongooseModule } from '@nestjs/mongoose';



import { UsersModule } from './users/users.module';



import { AuthModule } from './auth/auth.module';



import { ConfigModule, ConfigService } from '@nestjs/config';



import { softDeletePlugin } from 'soft-delete-plugin-mongoose';



import { CompanysModule } from './companys/companys.module';



import { JobsModule } from './jobs/jobs.module';



import { FilesModule } from './files/files.module';



import { ResumesModule } from './resumes/resumes.module';



import { PermissionsModule } from './permissions/permissions.module';



import { RolesModule } from './roles/roles.module';



import { DatabasesModule } from './databases/databases.module';



import { SubscribersModule } from './subscribers/subscribers.module';



import { MailModule } from './mail/mail.module';



import { ScheduleModule } from '@nestjs/schedule';



@Module({

  imports: [

    ThrottlerModule.forRoot({

      throttlers: [

        {

          ttl: 60000,



          limit: 10,

        },

      ],

    }),



    ScheduleModule.forRoot(),



    ConfigModule.forRoot({

      isGlobal: true,

    }),



    MongooseModule.forRootAsync({

      imports: [ConfigModule],



      inject: [ConfigService],



      useFactory: async (configService: ConfigService) => ({

        uri:

          configService.get<string>('MONGODB_URI') ??

          configService.get<string>('MONGO_URL') ??

          '',



        connectionFactory: (connection) => {

          connection.plugin(softDeletePlugin);



          return connection;

        },

      }),

    }),



    UsersModule,



    AuthModule,



    CompanysModule,



    JobsModule,



    FilesModule,



    ResumesModule,



    PermissionsModule,



    RolesModule,



    DatabasesModule,



    SubscribersModule,



    MailModule,

  ],



  controllers: [AppController],



  providers: [AppService],

})

export class AppModule { }

