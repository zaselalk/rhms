import { Router } from 'express';
import passport from '../config/passport';
import { User } from '../models/user';

const router: Router = Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Error registering new user.');
    }
});

export default router;
