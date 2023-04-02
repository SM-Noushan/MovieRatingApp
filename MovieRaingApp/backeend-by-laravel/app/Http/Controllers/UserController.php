<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

// use Illuminate\Validation\Rule;
Use App\Models\{ Movielist, MyRatings, Token, User };
// use Illuminate\Support\Facades\{Hash, Validator};

class UserController extends Controller
{
    public function index_user()
    {
        $movies = Movielist::orderBy('rating', 'desc')->take(3)->get();
        return $movies;
    }
    public function movie_list(Request $request)
    {
        $token = $request->header('Authorization');
        $token = json_decode($token);
        $userEmail = Token::where('api_token',  Hash('sha256', $token->access_token))->first('user_id');
        $userId = User::where('email', $userEmail->user_id)->first('id');
        $myRatings = MyRatings::where('user_id', $userId->id)->get();
        $movies = Movielist::all();
        return response()->json(['movies' => $movies, 'myRatings' => $myRatings]);
    }

    public function movie_myRating(Request $request)
    {
        $token = $request->header('Authorization');
        $token = json_decode($token);
        $userEmail = Token::where('api_token',  Hash('sha256', $token->access_token))->first('user_id');
        $userId = User::where('email', $userEmail->user_id)->first('id');
        $myRatings = MyRatings::where('user_id', $userId->id)->get();
        $movie_id = MyRatings::where('user_id', $userId->id)->pluck('movie_id');
        $movies = Movielist::whereIn('id', $movie_id)->orderby('updated_at', 'desc')->get();
        return response()->json(['movies' => $movies, 'myRatings' => $myRatings]);
    }

    public function movie_rate(Request $request)
    {
        $userId = User::where('email', $request->usermail)->first('id');
        $storeRating = new MyRatings;
        $storeRating->movie_id = $request->movie_id;
        $storeRating->user_id = $userId->id;
        $storeRating->ratings = ($request->rating * 2);
        $storeRating->save();

        $movie = Movielist::find($request->movie_id);
        
        $rated_by = $movie->rated_by;
        $rating = $movie->rating;
        
        $oldTotalRating = $rating * $rated_by;
        $newTotalRating = $oldTotalRating + ($request->rating * 2);
        $newRating = round($newTotalRating / ($rated_by + 1), 1);

        $movie->rated_by = ($rated_by + 1);
        $movie->rating = $newRating;
        $movie->save();

        return "Successful";
    }
}
