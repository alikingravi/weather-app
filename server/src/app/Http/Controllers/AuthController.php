<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Hashing\BcryptHasher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    /**
     * AuthController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth', ['only' => 'checkAuthUser']);
    }

    public function checkAuthUser()
    {
        $user = Auth::user();

        if (!isset($user)) {
            return response()->json([
                'status' => 404,
                'message' => 'User not logged-in'
            ]);
        }
        return response()->json([
            'status' => 200,
            'message' => 'User logged-in',
            'data' => $user
        ]);
    }

    /**
     * Registers a user and creates an account balance for them
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255|min:2',
            'username' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->input('name'),
            'username' => $request->input('username'),
            'password' => (new BcryptHasher())->make($request->input('password')),
        ]);

        return response()->json([
            'user' => $user,
            'message' => 'User has been created'
        ]);
    }

    /**
     * Logs in the user
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @internal param Request $request
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'username' => 'required|email',
            'password' => 'required|min:6'
        ]);

        $user = User::where('username', $request->input('username'))->first();

        // If user exists, assign them an api_token
        if (!empty($user)) {
            if ((new BcryptHasher())->check($request->input('password'), $user->password)) {
                $apiToken = base64_encode(Str::random(40));

                User::where('username', $request->input('username'))->update([
                    'api_token' => $apiToken
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Logged in successfully',
                    'data' => $user,
                    'api_token' => $apiToken
                ]);
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Unauthorized'
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Either Username or Password is incorrect'
            ]);
        }
    }
}
