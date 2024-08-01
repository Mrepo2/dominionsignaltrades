const express = require("express");

const router = express.Router();

const { homePage, aboutPage, contactPage,  termsPage,  registerPage, loginPage, register_post, login_post, logout_get, loginAdmin } = require("../controllers/userController");
const { loginAdmin_post } = require("../controllers/adminController");

router.get("/", homePage);

router.get("/about", aboutPage);

router.get("/contact", contactPage);

router.get("/market", termsPage)



router.get("/register", registerPage);
router.post("/register", register_post);

router.get("/login", loginPage);
router.post("/login", login_post)

router.get('/loginAdmin', loginAdmin);
router.post('/loginAdmin', loginAdmin_post)

router.get("/logout",logout_get)









module.exports = router;