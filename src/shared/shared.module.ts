import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryUploadService } from './cloud-upload.service';

@Module({
  imports: [CloudinaryModule],
  providers: [CloudinaryUploadService],
  exports: [CloudinaryUploadService],
})
export class SharedModule {}
