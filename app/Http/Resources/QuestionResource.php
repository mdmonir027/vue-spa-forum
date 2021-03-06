<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'title' => $this->title,
            'body' => $this->body,
            'path' => $this->path,
            'slug' => $this->slug,
            'category_name' => $this->category->name,
            'replies' => ReplyResource::collection($this->replies),
            'repliy_count' => $this->replies->count(),
            'user' => $this->user->name,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at->diffForHumans()
        ];
    }
}
