
import { AuthFailureError, BadRequestError, ConflictRequestError, NotFoundError } from '../core/error_response';
import KeyTokenService from './keyToken_service';
import UserService from './user_service';
import crypto from 'crypto';
import bcrypt from 'bcrypt'
import { IUser } from '../models/user_model';

class AuthService {
  private createKeyPair() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    return { publicKey, privateKey };
  }

  public async login({ email, password }: IUser) {
    // check user exits
    const user = await UserService.findUserByEmail(email);
    if (!user) throw new BadRequestError('Sorry, your account has not been registered. Please sign up to continue.');

    // compare password
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new AuthFailureError('AuthFailure error')

    // Create key pair
    const { publicKey, privateKey } = this.createKeyPair();

    // Create tokens
    const tokens = await new KeyTokenService().create({ email, user_id: user._id }, privateKey);
    if (!tokens) throw new BadRequestError('Failed to create tokens');

    // Save key token
    const newKeyToken = await new KeyTokenService().save(user._id, tokens.refreshToken);
    if (!newKeyToken) throw new BadRequestError('Failed to save key token');

    return {
      _id: user._id,
      publicKey,
      tokens
    };
  }

  public async register({ email, password }: IUser) {
    // Check email exists
    const user = await UserService.findUserByEmail(email);
    if (user) throw new BadRequestError('Email has already been registered.');

    // Create new user and save to db
    const newUser = await new UserService().createNewUser({ email, password });
    if (!newUser) throw new BadRequestError('Failed to create user');

    // Create key pair
    const { publicKey, privateKey } = this.createKeyPair();

    // Create tokens
    const tokens = await new KeyTokenService().create({ email, user_id: newUser._id }, privateKey);
    if (!tokens) throw new BadRequestError('Failed to create tokens');

    // Save key token
    const newKeyToken = await new KeyTokenService().save(newUser._id, tokens.refreshToken);
    if (!newKeyToken) throw new BadRequestError('Failed to save key token');

    return {
      _id: newUser._id,
      publicKey,
      tokens,
    };
  }

  public async logout(keyStore: any) {
    const delKey = await KeyTokenService.removeById(String(keyStore._id))
    if (!delKey) throw new Error()
    return {}
  }
}

export default AuthService;

