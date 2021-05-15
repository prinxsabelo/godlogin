<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
// use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
   
    public function Register(Request $request)
    {
        $validator = $request->validate([
            'lastname' => 'required',
            'firstname' => 'required',
            'password' => 'required',
            'email' => 'required|email',
        ]);
        $user = User::where('email', $request->email)->first();
        if(!$user){
            return User::create([
                'lastname' => $request['lastname'],
                'firstname' =>  $request['firstname'],
                'email' => $request['email'],
                'password' => Hash::make($request['password']),
                'social_provider'=> 'normal'
            ]);
        }else{
            $response = ["message" => "Email exists already.."];
            return response($response, 422);
        }
        
    }   
    public function Login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $token = auth()->attempt($credentials);
        if(! $token = auth()->attempt($credentials))
        {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return response()->json([
            'user' => auth()->user(),
            'token' => $token,
        ]);
       
        
    }  
    public function googleRegUrl()
    {
        return Response::json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl(),
        ]);
    }
    public function handleGoogleRegCallback()
    {
       
        $user = Socialite::driver('google')->stateless()->user();
        // return json_encode($user);
        $user->social_provider = 'google';
        isset($user->user['family_name']) ? $user->lastname = $user->user['family_name'] :  $user->lastname = '';

        isset($user->user['given_name']) ? $user->firstname = $user->user['given_name'] :  $user->firstname = '';
        return $this->socialUser($user);
    }
    public function socialUser($checkUser)
    {
        $user = User::where('email', '=', $checkUser->email)->first();
        if (!$user) {
            $response = ["message" => "You have no account yet.."];
            return response($response, 422);
        }
        // $token = auth()->attempt(['email' => $user->email, 'password' => $user->password]);
        $token = auth()->login($user);
        if(!$token)
        {
            return response()->json(['error' => 'Unauthorized', 'user' => $user], 401);
        }
        return response()->json([
            'user' => auth()->user(),
            'token' => $token,
        ]);
    }
}
