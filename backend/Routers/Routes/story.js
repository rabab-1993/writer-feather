import { Router } from "express";
import authentication from '../midleware/auth.js';
import { newStory, allStories, updatePost, deletePost, storyBy } from '../Controllers/story.js';

const storyRouter = Router();

storyRouter.post('/story',authentication, newStory)
storyRouter.get('/story',authentication, allStories)
storyRouter.get('/story/storyBy',authentication, storyBy)
storyRouter.put('/story',authentication, updatePost)
storyRouter.delete('/story',authentication, deletePost)



export default storyRouter;