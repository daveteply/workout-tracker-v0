import { Injectable } from '@nestjs/common';
import Sqids from 'sqids';

@Injectable()
export class UtilsService {
  private readonly ALPHABET = '3SRChn4jU79pXIDzBbcgQlofdE1tLPsiZFHuMxmr2k8KeVaWO5YG0qTwA6NyvJ';
  private readonly PADDING = 10;
  private _sqids = this.createSqidsInstance();

  private createSqidsInstance(): Sqids {
    return new Sqids({
      alphabet: this.ALPHABET,
      minLength: this.PADDING,
    });
  }

  public getSqid(id: number): string {
    return this.encodeId(id);
  }

  public getId(sqid: string): number {
    return this.decodeSqid(sqid);
  }

  private encodeId(id: number): string {
    return this._sqids.encode([id]);
  }

  private decodeSqid(sqid: string): number {
    return this._sqids.decode(sqid)[0];
  }
}
