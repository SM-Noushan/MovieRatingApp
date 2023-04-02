<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
Use App\Models\{ User, Movielist};
use Illuminate\Support\Facades\{Hash, Validator};

class AdminController extends Controller
{
    public function index_admin()
    {
        $movies = Movielist::all();
        return $movies;
        // return response()->json(['movies'=>$movies_count]);
    }

    public function add_movie(Request $request)
    {
        for($i=0; $i<20; $i++){
            $movie = new Movielist;
            // $movie->id = $request[$i]['id'];
            $movie->name = $request[$i]['original_title'];
            $movie->description = $request[$i]['overview'];
            $movie->rating = $request[$i]['vote_average'];
            $movie->rated_by = $request[$i]['vote_count'];
            $movie->release_year = $request[$i]['release_date'];
            $movie->image = $request[$i]['poster_path'];
            $movie->save();
        }
        return 'Successfully Registered Into Database';
    }

    public function edit_movie(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'date'  => 'required','regex:/^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/',
            'name'      => 'required|string',
            'description'      => 'nullable|string',
        ]);
        if($validator->fails()){
            return response(['errors'=> $validator->errors()]);
        }

        $movie = Movielist::find($id);
        $movie->name = $request->name;
        $movie->description = $request->description;
        $movie->release_year = $request->date;
        $movie->save();
        return ('Successfully Updated Movie Details');
    }

    public function view_user()
    {
        $user = User::whereNot('role', 'admin')->get();
        return $user;
    }

    public function add_user(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userid'  => 'required|string|unique:users,email',
            'password'  => 'required|min:6|max:32',
            'name'      => 'required|string',
        ],
        [
            'userid.unique' => 'Email already exists',
        ]);
        if($validator->fails()){
            return response(['errors'=> $validator->errors()]);
        }

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->userid;
        $user->password =Hash::make($request->password);
        $user->save();
        return ('Successfully Added New User');
    }
    public function edit_user(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'userid'  => [
                            'required','string',
                            Rule::unique('users','email')->ignore($id)
                        ],
            'password'  => 'nullable|min:6|max:32',
            'name'      => 'required|string',
            'status'      => 'required|string|min:6|max:6',
        ],
        [
            'userid.unique' => 'Email already exists',
        ]);
        if($validator->fails()){
            return response(['errors'=> $validator->errors()]);
        }

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->userid;
        $user->status = $request->status;
        if($request->password != null)
            $user->password =Hash::make($request->password);
        $user->save();
        return ('Successfully Updated New User');
    }
    public function ban_user($id)
    {
        $user = User::Where('id', $id)->first();
        $user->status = 'Banned';
        $user->save();
        $userAll = User::whereNot('role', 'admin')->get();
        return $userAll;
    }
    public function unban_user($id)
    {
        $user = User::Where('id', $id)->first();
        $user->status = 'Active';
        $user->save();
        $userAll = User::whereNot('role', 'admin')->get();
        return $userAll;
    }
}
