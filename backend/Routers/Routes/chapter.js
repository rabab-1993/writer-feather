import { Router } from "express";
const chapterRouter = Router();
import { newChapter, updateChapter, deleteChapter, allChapters } from '../Controllers/chapter.js';
import authentication from '../Midleware/auth.js';


chapterRouter.get('/chapter', authentication, allChapters)
chapterRouter.post('/chapter/new', authentication, newChapter)
chapterRouter.put('/chapter', authentication, updateChapter)
chapterRouter.delete('/chapter', authentication , deleteChapter)






export default chapterRouter;