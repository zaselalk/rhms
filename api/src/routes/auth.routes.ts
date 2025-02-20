// import router as
import { Router } from 'express';

const router:Router = Router();

router.get('/login', (req, res) => {
    res.send('Hello World!');
});

router.get('/register', (req, res) => {
    res.send('Hello World!');
});

export default router;
