<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {

        return [
            'read' => NotificationResource::collection(auth()->user()->readNotifications),
            'unread' => NotificationResource::collection(auth()->user()->unreadNotifications),
        ];

    }

    public function markAsRead(Request $request)
    {
        auth()->user()->notifications->where('id', $request->id)->markAsRead();
    }
}
