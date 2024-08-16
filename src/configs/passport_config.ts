import passportgoogleOauth20 from 'passport-google-oauth20'
import passport from 'passport'
import AuthService from '../services/auth_service';
import { OK } from '../core/success_response';
import { IGoogleResponse } from '../interface';

const GoogleStrategy = passportgoogleOauth20.Strategy

const gooleConfig: { clientID: string, clientSecret: string, callbackURL: string } = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "http://localhost:3000/auth/google/callback"!
}
passport.use(new GoogleStrategy(gooleConfig,
  async function(accessToken: string, refreshToken: string, profile: any, cb: any) {
    const infoResponse: IGoogleResponse = profile._json;
    cb(null, new OK({
      message: 'Login success',
      metadata: await new AuthService().loginGoogle(infoResponse)
    }))
  }
));

passport.serializeUser(function(user: any, cb) {
  process.nextTick(function() {
    cb(null, user);
  });
});

passport.deserializeUser(function(user: any, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
})


