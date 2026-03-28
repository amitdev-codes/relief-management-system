<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            $roles = [
                ['name' => 'SuperAdmin','slug'=>'superadmin','name_np'=>'मुख्य प्रशासक','guard_name'=>'web','is_superadmin'=>true],
                ['name' => 'Admin','slug'=>'admin','name_np'=>'प्रशासक','guard_name'=>'web','is_superadmin'=>false],
                ['name' => 'User','slug'=>'user','name_np'=>'प्रयोगकर्ता','guard_name'=>'web','is_superadmin'=>false],
                ['name' => 'LocalLevelAdmin','slug'=>'localLevelAdmin','name_np'=>'पालिका प्रशासक','guard_name'=>'web','is_superadmin'=>false]];
            foreach ($roles as $role) {
                Role::create($role);
            }

    }
}

