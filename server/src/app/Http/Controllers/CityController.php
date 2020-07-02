<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\User;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Get All Cities
     */
    public function index()
    {
        $cities = City::all();

        if (count($cities) === 0) {
            return response()->json([
                'status' => 404,
                'message' => 'No cities were found'
            ]);
        }

        return response()->json([
            'status' => 200,
            'data' => $cities
        ]);
    }

    public function getUserCities(Request $request)
    {
        $userCities = User::find($request->input('user_id'))->cities;

        return response()->json([
            'status' => 200,
            'data' => $userCities
        ]);
    }

    public function addUserCities(Request $request)
    {
        $user = User::find($request->input('user_id'));

        $user->cities()->attach($request->input('cityIds'));

        return response()->json([
            'status' => 200,
            'data' => $user
        ]);
    }

    public function removeUserCities(Request $request)
    {
        $user = User::find($request->input('user_id'));

        $user->cities()->detach($request->input('cityIds'));

        return response()->json([
            'status' => 200,
            'data' => $user
        ]);
    }
}
