# Expense-Tracker

---

使用者可以在註冊帳號(register / Facebook / Google)後，紀錄每日支出。

## 專案功能

---

首頁呈現花費支出，可以依照支出類別篩選支出類別。

1. 呈現支出列表
2. 新增支出
3. 修改支出
4. 刪除支出
5. 篩選支出類別

## 環境建置與需求

- [bcryptjs@2.4.3][bcryptjs]
- [connect-flash@0.1.1][connect-flash]
- [connect-mongo@4.6.0][connect-mongo]
- [dotenv@16.0.1][dotenv]
- [express@4.18.1][express]
- [express-handlebars@6.0.6][express-handlebars]
- [express-session@1.17.3][express-session]
- [handlebars-helpers@0.10.0][handlebars-helpers]
- [method-override@3.0.0][method-override]
- [mongoose@6.5.3][mongoose]
- [passport@0.4.1][passport]
- [passport-facebook@3.0.0][passport-facebook]
- [passport-google-oauth20@2.0.0][passport-google-oauth20]
- [passport-local@1.0.0][passport-local]

[bcryptjs]: https://www.npmjs.com/package/bcryptjs
[connect-flash]: https://www.npmjs.com/package/connect-flash
[connect-mongo]: https://www.npmjs.com/package/connect-mongo
[dotenv]: https://www.npmjs.com/package/dotenv
[express]: https://www.npmjs.com/package/express
[express-handlebars]: https://www.npmjs.com/package/express-handlebars
[express-session]: https://www.npmjs.com/package/express-session
[handlebars-helpers]: https://www.npmjs.com/package/handlebars-helpers
[method-override]: https://www.npmjs.com/package/method-override
[mongoose]: https://www.npmjs.com/package/mongoose
[passport]: https://www.npmjs.com/package/passport
[passport-facebook]: https://www.npmjs.com/package/passport-facebook
[passport-google-oauth20]: https://www.npmjs.com/package/passport-google-oauth20
[passport-local]: https://www.npmjs.com/package/passport-local

## 安裝與執行步驟

1. 將檔案 clone 到本機`git clone git@github.com:Kris3131/expense-tracker.git`
2. 指向到資料夾中`cd expense-tracker`
3. 安裝專案需要 module `npm i`
4. 載入種子資料 `npm run seed`
   a). 登入：
   email: `user1@example.com`
   passport: `12345678`
5. 啟動 localhost server `npm run dev`
