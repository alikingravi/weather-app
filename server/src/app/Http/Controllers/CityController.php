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
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $cities
        ], 200);
    }

    public function getUserCities()
    {
        $userCities = User::find(auth()->user()->id)->cities;

        if (count($userCities) === 0) {
            return response()->json([
                'status' => 404,
                'message' => 'No cities were found for this user'
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $userCities
        ], 200);
    }

    public function addUserCities(Request $request)
    {
        $user = User::find(auth()->user()->id);
        $user->cities()->attach($request->input('cityIds'));

        return response()->json([
            'status' => 200,
            'data' => $user
        ], 200);
    }

    public function removeUserCities(Request $request)
    {
        $user = User::find(auth()->user()->id);
        $user->cities()->detach($request->input('cityIds'));

        return response()->json([
            'status' => 200,
            'data' => $user
        ], 200);
    }
}
