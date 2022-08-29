const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
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
						if (!user)
							return done(null, false, { message: `Email is not register` }) // 假如沒有資料->結束程序,不用帶錯誤訊息/沒有用戶資料/顯示訊息
						if (user.password !== password)
							return done(null, false, {
								message: `Email or Password incorrect`,
							}) // 假如密碼不同->結束程序,不用帶錯誤訊息/沒有用戶資料/顯示訊息
						return done(null, user) // 建立使用者
					})
					.catch((err) => done(err, false))
			}
		)
	)

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})
	passport.deserializeUser((id, done) => {
		User.findById(id)
			.lean()
			.then((user) => done(null, user))
			.catch((err) => done(err, null))
	})
}
