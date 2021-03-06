<?php

namespace App\Http\Controllers\Api;

use App\Events\LikeEvent;
use App\Http\Controllers\Controller;
use App\Models\Reply;
use Symfony\Component\HttpFoundation\Response;

class LikeController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('JWT');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Models\Reply $reply
     * @return \Illuminate\Http\Response
     */
    public function likeIt(Reply $reply)
    {
        $reply->likes()->create([
            'user_id' => auth()->id()
        ]);
        broadcast(new LikeEvent($reply->id, 1))->toOthers();
        return response('Like', Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Reply $reply
     * @return \Illuminate\Http\Response
     */
    public function unlikeIt(Reply $reply)
    {
        $reply->likes()->where('user_id', auth()->id())->first()->delete();
        broadcast(new LikeEvent($reply->id, 0))->toOthers();
        return response('Unlike', Response::HTTP_ACCEPTED);
    }
}
