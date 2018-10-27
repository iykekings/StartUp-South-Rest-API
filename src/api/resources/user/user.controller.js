import userService from './user.service';
import User, { STANDARD_ROLE } from './user.model';
import jwt from '../../helpers/jwt';

export default {
  async signUp(req, res) {
    try {
      const { value, error } = userService.validateSignUp(req.body);
      if (error) {
        return res.status(400).json(error);
      }
      const encryptedPass = userService.encryptPassword(value.password);

      await User.create({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        phone: value.phone,
        company: value.company,
        position: value.position,
        location: value.location,
        points: value.points,
        password: encryptedPass,
        role: value.role || STANDARD_ROLE
      });
      return res.json({ Success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async login(req, res) {
    try {
      const { value, error } = userService.validateLogin(req.body);
      if (error) {
        return res.status(400).json(error);
      }
      const user = await User.findOne({ email: value.email });
      if (!user) {
        return res.status(401).json({ error: 'unathorized' });
      }
      const authenticated = await userService.comparePassword(
        value.password,
        user.password
      );
      if (!authenticated) {
        return res.status(401).json({ error: 'unathorized' });
      }
      const token = jwt.issue({ id: user._id }, '1d');
      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};
