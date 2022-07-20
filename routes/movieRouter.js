import { Router } from "express";
import { route } from "express/lib/router";
import authenticationMiddleware from "../middlewares/authenticationMiddleware";
import { authUser , getCastMovies , getMovies , getTopMovies } from '../controllers/movieController.js';

const router = Router();


//@desc api for authentication
//@access public
//@path get /login

router.post('/login',authUser);

//@desc api for getting movieName and year
//@access public
//@path get /movies

router.get('/movies',authenticationMiddleware,getMovies);

//@desc api for getting top rated movies
//@access public
//@path get /movie/top

router.get('movies/top',authenticationMiddleware,getTopMovies);

//@desc api for getting movieName and year
//@access public
//@path get /movie/cast

router.get('movies/:cast',authenticationMiddleware,getCastMovies);



export default router;