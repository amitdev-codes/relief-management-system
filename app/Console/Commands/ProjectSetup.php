<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ProjectSetup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:ps';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Artisan::call('migrate:fresh');
        Artisan::call('migrate --path=database/migrations/master');
        Artisan::call('migrate --path=database/migrations/subCategory');
        Artisan::call('migrate --path=database/migrations/applicantProfile');
        Artisan::call('migrate --path=database/migrations/applicationForm');
        Artisan::call('migrate --path=database/migrations/payments');
        Artisan::call('migrate --path=database/migrations/loan');
        Artisan::call('db:seed');
        echo "process completed";
    }
}
