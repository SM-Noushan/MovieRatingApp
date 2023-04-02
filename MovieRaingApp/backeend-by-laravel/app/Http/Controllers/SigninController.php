<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DateTime;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
Use App\Models\{ User, Token};

class SigninController extends Controller
{
    public function signin(Request $request)
    {
        $check = $request->all();
        if(Auth::attempt(['email' => $check['email'], 'password' => $check['password']])){
            if(Auth::user()->status == 'Active'){
                $api_token = Str::random(60);
                $token = new Token;
                $token->user_id = $request->email;
                $token->api_token = Hash('sha256', $api_token);
                $token->save();
                return response()->json(['role' => Auth::user()->role,'userid' => $check['email'], 'access_token' =>    
                $api_token]);
            }
            return response()->json(['banned'=>"You're Banned"]);
        }
        return response()->json(['error'=>'Invalid Credentials']);
    }

    public function signout(Request $request)
    {
        $token = $request->header('Authorization');
        $token = json_decode($token);
        $db_token = Token::where('api_token',  Hash('sha256', $token->access_token))->first();
        // $db_token->delete();
        if($db_token){
            $db_token->expired_at = new DateTime();
            $db_token->save();
            return 'successful';
        }
        return 'error';
    }
}
