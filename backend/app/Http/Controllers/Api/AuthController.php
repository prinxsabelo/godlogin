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

// use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
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

        return $this->SocialUser($user);
    }

    public function SocialUser($data)
    {
        $user = User::where('email', '=', $data->email)->first();
        if (!$user) {
            
            // $response = ["message" => "You have no account yet.."];
            // return response($response, 422);
            $user = new User();
            $user->lastname = $data->lastname;
            $user->firstname = $data->firstname;
            $user->email = $data->email;
            $user->social_id = $data->id;
            $user->avatar = $data->avatar;
            $user->social_provider = $data->social_provider;
            $user->password = encrypt('form_test');
            $user->save();
            
        }
                  // Authentication passed...
        $response['success'] = true;
        return json_encode($response);
    }
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
        if (Auth::attempt($credentials)) {
            // Authentication passed...
            $response['success'] = true;
            return json_encode($response);
        }else{
            $response['success'] = false;
            $response = ["message" => "Invalid login details.."];
            return response($response, 422);
        }
        
    }   
}
