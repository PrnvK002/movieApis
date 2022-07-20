import asyncHandler from 'express-async-handler';
import Movies from '../models/movies.js';
import Users from '../models/user.js';
import generateToken from '../utils/generateToken.js';

//@desc api for authentication
//@access public
//@path get /login

export const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    const user = await Users.findOne({ email:email });
    if(!user){
        res.status(401);
        throw new Error('Email not registered');
    }
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
          _id: user._id,
          email: user.email,
          authToken: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error("Invalid Email or password");
      }
})

//@desc api for getting movieName and year
//@access public
//@path get /movie

export const getMovies = asyncHandler(async (req,res) => {

    const movies = await Movies.find({ year : { $gte : new Date('2010-01-01')} } , { title : 1 , year : 1 }).sort({ title : 1 });
    if(movies.length){
        res.status(200).json({ movies });
    }
    res.status(404);
    throw new Error('No movies found');

});

//@desc api for getting top rated movies
//@access public
//@path get /movie/top

export const getTopMovies = asyncHandler(async (req,res) => {
    const topMovies = await Movies.aggregate([
        { $match : { ratings : { $gte : 8.0 } } },
        { $group : { _id : { movieName : "$title" , director : "$director" , rating : "$ratings" } } },
        { $project : { movieName : "$_id.movieName" , director : "$_id.director" , rating : "$_id.rating" } }
    ]);
    if(topMovies.length){
        res.status(200).json({ topMovies });
    }
    res.status(404);
    throw new Error('Cannot find the movies');
});

//@desc api for getting movieName and year
//@access public
//@path get /movie/cast

export const getCastMovies = asyncHandler(async (req,res) => {
    const {cast} = req.params;
    const movies = await Movies.find({ cast : { $in : cast } },{ title : 1 , cast : 1 });
    if(movies.length){
        res.status(200).json({ movies });
    }
    res.status(404);
    throw new Error('Cannot find any movies');
});