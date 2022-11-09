import { Module } from '@nestjs/common';
import PublicModule from '../public/public.module';
import { GlobalModule } from './global.module';

@Module({
    imports: [
        GlobalModule,
        PublicModule
    ]
})
export class AppModule {}