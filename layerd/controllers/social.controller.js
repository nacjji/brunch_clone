const { Users } = require('../../models');
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

class SocialLoginController {
  login = async (req, res, next) => {
    const { accessToken, profile, done } = passport.authenticate(
      new KakaoStrategy(),
    );
    console.log(accessToken);
  };
}

module.exports = SocialLoginController;

// try {
//     const exUser = await Users.findOne({
//       // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
//       where: { snsId: profile.id, provider: 'kakao' },
//     });
//     // 이미 가입된 카카오 프로필이면 성공
//     if (exUser) {
//       done(null, exUser); // 로그인 인증 완료
//     } else {
//       // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
//       const newUser = await Users.create({
//         writer: kakao_account.profile.nickname,
//         snsId: profile.id,
//         provider: 'kakao',
//       });

//       done(null, newUser); // 회원가입하고 로그인 인증 완료
//     }
//   } catch (error) {
//     console.error(error);
//     done(error);
//   }

//   console.log(accessToken);
