import { dbModels as models } from "../Manager.js";
import User from "../Structure/User.js";
import { checkPasswordValidation } from "../utils/helpers.js";

export const userController = {
  signIn: async (req, res) => {
    const { username, password } = req.body;
    const user = await models.user.findOne({
      "credentials.username": username.toLowerCase(),
    });

    if (!user || user.credentials.password !== password)
      return res.send({ error: "Invalid credentials" });

    return res.send({ success: "Credentials are correct", user });
  },
  signUp: async (req, res) => {
    const { email, firstName, lastName, phoneNumber, address, state, city, gender, birthDate, username, password } = req.body;
    const isNotValid = checkPasswordValidation(password);
    if (isNotValid) return res.send({ error: isNotValid });

    const foundUser = await await models.user.findOne({
      "credentials.username": username.toLowerCase(),
    });
    if (foundUser)
      return res.send({ error: "User already exists with that username." });

    const user = new User({
      email,
      details: { firstName, lastName, phoneNumber, address, state, city, gender, birthDate },
      credentials: { username, password },
    });
    await models.user.create(user);
    return res.send({ success: "User was created", user });
  }
}