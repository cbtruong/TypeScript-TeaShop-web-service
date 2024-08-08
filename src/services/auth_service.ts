
import mongoose from "mongoose";
import KeyTokenService from "./keyToken_service";
import UserService from "./user_service";
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
    try {
      const user = await UserService.findUserByEmail(email)
      if (!user) {
        return {
          message: `Sorry, your account has not been registered. Please sign up to continue.`
        }
      }

      // Create key pair
      const { publicKey, privateKey } = this.createKeyPair();

      // Create tokens
      const tokens = await new KeyTokenService().create({ email }, privateKey);
      if (!tokens) {
        return { message: 'Failed to create tokens' };
      }

      // Save key token
      const newKeyToken = await new KeyTokenService().save(user._id, tokens.refreshToken);
      if (!newKeyToken) {
        return { message: 'Failed to save key token' };
      }

      return {
        message: `Login successful! Welcome back.`,
        metada: {
          publicKey,
          tokens
        }
      }

    } catch (error) {
      return {
        message: 'Server Error'
      }
    }
  }

  public async register({ email, password }: RegisterParams) {
    try {
      // Check email exists
      const user = await UserService.findUserByEmail(email);
      if (user) {
        return { message: `Email has already been registered.` };
      }

      // Create key pair
      const { publicKey, privateKey } = this.createKeyPair();

      // Create tokens
      const tokens = await new KeyTokenService().create({ email }, privateKey);
      if (!tokens) {
        return { message: 'Failed to create tokens' };
      }

      // Create new user and save to db
      const newUser = await new UserService().createNewUser({ email, password });
      if (!newUser) {
        return { message: 'Failed to create user' };
      }

      // Save key token
      const newKeyToken = await new KeyTokenService().save(newUser._id, tokens.refreshToken);
      if (!newKeyToken) {
        return { message: 'Failed to save key token' };
      }

      return {
        message: `Registration successful!`,
        metadata: {
          publicKey,
          tokens,
        },
      };
    } catch (error) {
      console.error('Error during registration:', error);
      return { message: 'Server error' };
    }
  }
}

export default AuthService;

