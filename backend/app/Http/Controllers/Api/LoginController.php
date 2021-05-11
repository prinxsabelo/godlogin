<?php


namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;


// use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
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
      
        $user->social_provider = 'google';
        $user->lastname = $user->user['family_name'];
        $user->firstname = $user->user['given_name'];
        return $this->registerUser($user);
    }
    public function registerUser($data)
    {
        $user = User::where('email', '=', $data->email)->first();
        if (!$user) {
            $user = new User();
            $user->lastname = $data->lastname;
            $user->firstname = $data->firstname;
            $user->email = $data->email;
            $user->social_id = $data->id;
            $user->avatar = $data->avatar;
            $user->social_provider = $data->social_provider;
            $user->password = encrypt('form_test');
            $user->save();
           
        }else{
            return Response::json(['exist'=> true]);
        }
        return json_encode($user);
        // Auth::login($user);
    }
    public function Register(Request $request)
    {
        echo json_encode($request['lastname']);
    }
}
