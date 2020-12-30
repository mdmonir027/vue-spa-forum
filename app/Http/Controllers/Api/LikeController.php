<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reply;
use Symfony\Component\HttpFoundation\Response;

class LikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Models\Reply $reply
     * @return \Illuminate\Http\Response
     */
    public function likeIt(Reply $reply)
    {
        $reply->likes()->create([
            'user_id' => '1'
        ]);

        return response('Like' , Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reply $reply
     * @return \Illuminate\Http\Response
     */
    public function unlikeIt(Reply $reply)
    {
        $reply->likes()->where('user_id' , '1')->first()->delete();
        return response('Unlike' , Response::HTTP_ACCEPTED);
    }
}
