import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadingTimeService {
  calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s/g).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
  }
}
