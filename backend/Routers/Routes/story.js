import { Router } from "express";
import authentication from "../Midleware/auth.js";
import {
  newStory,
  allStories,
  oneStory,
  updatePost,
  deleteStory,
  storyBy,
} from "../Controllers/story.js";

const storyRouter = Router();

storyRouter.post("/story", authentication, newStory);
storyRouter.get("/story", authentication, allStories);
storyRouter.get("/story/oneStory", authentication, oneStory);
storyRouter.get("/story/storyBy", storyBy);
storyRouter.put("/story", authentication, updatePost);
storyRouter.delete("/story/delete", authentication, deleteStory);

export default storyRouter;
