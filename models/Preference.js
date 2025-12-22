import mongoose from "mongoose";
const preferenceScheme = new mongoose.Schema(
    {
        userId: { type : mongoose.Schema.Types.ObjectId, required : true, unique : true},
        favoriteMoods  : [String],
        favoriteAesthetics : [String],
        favoriteGenres : [Number],
        likedMovieIds  : [Number],
        likedBookIds   : [String],
    },
    {timestamps : true}
    
);

export default mongoose.model("Preference",preferenceScheme);