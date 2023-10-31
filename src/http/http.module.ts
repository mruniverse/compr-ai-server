import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { HttpService } from './http.service';

@Global()
@Module({
  imports: [AxiosHttpModule],
  providers: [HttpService],
  exports: [AxiosHttpModule, HttpService],
})
export class HttpModule extends AxiosHttpModule {}
