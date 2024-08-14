import { AuthFailureError, BadRequestError, ConflictRequestError } from '../core/error_response';
import KeyTokenService from './keyToken_service';
import UserService from './user_service';
import crypto from 'crypto';
import bcrypt from 'bcrypt'
import { IUser } from '../models/user_model';
import transporter from '../configs/mail_config';
import mailOption from '../helpers/mail_option';
import { IGoogleResponse } from '../interface';
import { ObjectId, Types } from 'mongoose';

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
    console.log(password)
    if (!match) throw new AuthFailureError('AuthFailure error')

    // Create key pair
    const { publicKey, privateKey } = this.createKeyPair();

    // Create tokens
    const tokens = await new KeyTokenService().create({ user_id: user._id }, privateKey);
    if (!tokens) throw new BadRequestError('Failed to create tokens');

    // Save key token
    const saveKeyToken = await new KeyTokenService().save(user._id, tokens.refreshToken);
    if (!saveKeyToken) throw new BadRequestError('Failed to save key token');

    return {
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
    const tokens = await new KeyTokenService().create({ user_id: newUser._id }, privateKey);
    if (!tokens) throw new BadRequestError('Failed to create tokens');

    // Save key token
    const saveKeyToken = await new KeyTokenService().save(newUser._id, tokens.refreshToken);
    if (!saveKeyToken) throw new BadRequestError('Failed to save key token');

    return {
      publicKey,
      tokens,
    };
  }

  public async logout(keyStore: any) {
    const delKey = await KeyTokenService.removeById(String(keyStore._id))
    if (!delKey) throw new Error()
    return {}
  }

  public async loginGoogle({ sub, family_name, given_name, picture }: IGoogleResponse) { // check google id exists
    let newUser = await UserService.findUserByGoogleId(sub)

    if (!newUser) {
      const saveUser: any = await new UserService().createNewUser({ google_id: sub, first_name: given_name, last_name: family_name, image: picture })
      newUser = saveUser
    }

    // Create key pair
    const { publicKey, privateKey } = this.createKeyPair();

    // Create tokens
    const tokens = await new KeyTokenService().create({ user_id: newUser?._id }, privateKey);
    if (!tokens) throw new BadRequestError('Failed to create tokens');

    // Save key token
    const saveKeyToken = await new KeyTokenService().save(newUser!._id, tokens.refreshToken);
    if (!saveKeyToken) throw new BadRequestError('Failed to save key token');

    return {
      publicKey,
      tokens,
    };

  }

  public async passwordReset({ currentPassword, newPassword, user_id }: { currentPassword: string, newPassword: string, user_id: string }) {
    const user: any = await UserService.findUserById(user_id)

    const match = await bcrypt.compare(currentPassword, user?.password)

    if (!match) throw new AuthFailureError('Invalid password')

    const saveNewPassword = await UserService.updatePassword({ user_id: user_id, newPassword: newPassword })

    if (!saveNewPassword) {
      throw new Error()
    }
    return {}
  }

  public async passwordForgot(email: string) {
    // check user exits
    const user = await UserService.findUserByEmail(email);
    if (!user) throw new BadRequestError('Sorry, your account has not been registered. Please sign up to continue.');

    const resetPasswordUrl = '...'

    const mailOptions = mailOption({
      to: email,
      subject: 'Reset Your Password',
      text: `Hi,

    To reset your password, please click on the following link: ${resetPasswordUrl}

    If you did not request a password reset, please ignore this email.

    Thanks,
    TEA SHOP`,
    });

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return {}
    } catch (err) {
      console.log(err)
      throw new BadRequestError('Send mail error');
    }
  }


  public async checkToken(token: string, user_id: string) {
    // Kiểm tra token có tồn tại không
    const findToken = await KeyTokenService.findByToken(token);
    if (!findToken) {
      const wasDeleted = await KeyTokenService.deleteByUserId(user_id);
      if (!wasDeleted) throw new ConflictRequestError();
      else return {
        message: 'A potential refresh token leak has been detected.',
        code: '0001'
      };
    }

    // Tạo cặp khóa
    const { publicKey, privateKey } = this.createKeyPair();

    // Tạo tokens mới
    const tokens = await new KeyTokenService().create({ user_id: user_id }, privateKey);
    if (!tokens) throw new BadRequestError('Failed to create tokens');

    // Lưu refresh token mới và thêm token cũ vào danh sách đã sử dụng
    const saveKeyToken = await KeyTokenService.saveRefreshTokenUsed(token, tokens.refreshToken);
    console.log(saveKeyToken);
    if (!saveKeyToken) throw new BadRequestError('Failed to save key token');

    return {
      publicKey,
      tokens,
    };
  }

}



export default AuthService;

