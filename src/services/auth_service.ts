
import { BadRequestError, ConflictRequestError } from '../core/error_response';
import KeyTokenService from './keyToken_service';
import UserService from './user_service';
import crypto from 'crypto';

interface RegisterParams {
  email: string;
  password: string;
}

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

  public async login({ email, password }: RegisterParams) {
    const user = await UserService.findUserByEmail(email);
    if (!user) throw new BadRequestError('Sorry, your account has not been registered. Please sign up to continue.');

    // Create key pair
    const { publicKey, privateKey } = this.createKeyPair();

    // Create tokens
    const tokens = await new KeyTokenService().create({ email }, privateKey);
    if (!tokens) throw new BadRequestError('Failed to create tokens');

    // Save key token
    const newKeyToken = await new KeyTokenService().save(user._id, tokens.refreshToken);
    if (!newKeyToken) throw new BadRequestError('Failed to save key token');

    return {
      publicKey,
      tokens
    };
  }

  public async register({ email, password }: RegisterParams) {
    // Check email exists
    const user = await UserService.findUserByEmail(email);
    if (user) throw new BadRequestError('Email has already been registered.');

    // Create key pair
    const { publicKey, privateKey } = this.createKeyPair();

    // Create tokens
    const tokens = await new KeyTokenService().create({ email }, privateKey);
    if (!tokens) throw new BadRequestError('Failed to create tokens');

    // Create new user and save to db
    const newUser = await new UserService().createNewUser({ email, password });
    if (!newUser) throw new BadRequestError('Failed to create user');

    // Save key token
    const newKeyToken = await new KeyTokenService().save(newUser._id, tokens.refreshToken);
    if (!newKeyToken) throw new BadRequestError('Failed to save key token');

    return {
      publicKey,
      tokens,
    };
  }
}

export default AuthService;

