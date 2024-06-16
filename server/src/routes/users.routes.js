import express from "express";
import {login, register, test, admintest, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from "../controllers/users.controllers.js"
import { isAdmin, requireSignIn } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route('/register').post(register);

router.route('/login').post(login);

router.use('/test', requireSignIn, test);

router.use('/admin-test', requireSignIn, isAdmin, admintest);

router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ok:true});
})

router.put("/profile", requireSignIn, updateProfileController);


router.get("/orders", requireSignIn, getOrdersController);

router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router