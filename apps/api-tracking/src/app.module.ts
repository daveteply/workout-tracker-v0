import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingModule } from './tracking/tracking.module';
import { MongooseConfigService } from './services/mongoose-config/mongoose-config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    TrackingModule,
  ],
  controllers: [],
  providers: [MongooseConfigService],
})
export class AppModule {}
