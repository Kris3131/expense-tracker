const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require('../models/User')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true }, //
      (req, email, password, done) => {
        User.findOne({ email }) // 從資料庫找有沒有人
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: req.flash('warning_msg', 'Email 沒有註冊過')
              }) // 假如沒有資料->結束程序,不用帶錯誤訊息/沒有用戶資料/顯示訊息
            }
            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) {
                return done(null, false, {
                  message: req.flash('warning_msg', 'Email 或 Password 不正確')
                })
              }
              return done(null, user)
            })
          })
          .catch((err) => done(err, false))
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_CLIENTID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: process.env.FB_CALLBACK_URL,
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        User.findOne({ email })
          .then((user) => {
            if (user) {
              return done(null, user)
            }
            const randomPassword = Math.random().toString(36).slice(-8)
            bcrypt
              .genSalt(10)
              .then((salt) => bcrypt.hash(randomPassword, salt))
              .then((hash) =>
                User.create({
                  name,
                  email,
                  password: hash
                })
              )
              .then((user) => done(null, user))
              .catch((err) => done(err, false))
          })
          .catch((err) => done(err, false))
      }
    )
  )

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        User.findOne({ email })
          .then((user) => {
            if (user) {
              return done(null, user)
            }
            const randomPassword = Math.random().toString(36).slice(-8)
            bcrypt
              .genSalt(10)
              .then((salt) => bcrypt.hash(randomPassword, salt))
              .then((hash) =>
                User.create({
                  name,
                  email,
                  password: hash
                })
              )
              .then((user) => done(null, user))
              .catch((err) => done(err, false))
          })
          .catch((err) => done(err, false))
      }
    )
  )
  // user -> session
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })
  // session -> user
  passport.deserializeUser((id, done) => {
    return User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
