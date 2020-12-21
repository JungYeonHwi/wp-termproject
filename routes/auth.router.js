const { Router } = require('express');
const { models: { User } } = require('../mongo');

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    req.flash('errorMessage', '등록되지 않은 아이디입니다.');
    return res.redirect('/login');
  } else if (!user.authenticate(password)) {
    req.flash('errorMessage', '잘못된 비밀번호입니다.');
    return res.redirect('/login');
  }

  req.session.isAuthenticated = true;
  req.session.user = { username };

  res.redirect('/');
});

rotuer.get('/logout', (req, res, next) => {
  req.session.destroy();   // 세션 정보를 삭제
  res.redirect('/login');  // 로그인 페이지로 리다이렉션
});



module.exports = router;
