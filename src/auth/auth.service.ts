import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  login(id: number) {
    return jwt.sign({ id: id }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
  }

  verifyToken(token: string) {
    const userId: number = jwt.verify(token, process.env.SECRET_KEY)['id'];
    return userId;
  }
}
