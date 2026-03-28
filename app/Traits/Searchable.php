<?php

namespace App\Traits;


trait Searchable
{
    public function scopeSearch($query, $term)
    {
        $searchableFields = $this->searchableFields ?? ['name'];

        return $query->where(function ($query) use ($searchableFields, $term) {
            foreach ($searchableFields as $field) {
                $query->orWhere($field, 'LIKE', "%{$term}%");
            }
        });
    }
}
