import { Router } from "express";
import { createUser, getUser, updateContent, getContent, deleteContent, shareContent, createShareLink } from "../controllers/userController.ts"


const router = Router();

router.post('/user/signup', createUser());

router.post('/user/signin', getUser());

router.post('/user/content', updateContent());

router.get('/user/content', getContent());

router.delete('/user/content', deleteContent())

router.post('/user/brain/share', shareContent())

router.get('/user/brain/:shareLink', createShareLink())

export default router;

