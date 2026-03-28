<?php

namespace App\Providers;

use App\Models\FiscalYear;
use App\Models\LocalLevel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;

class StaticDataServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton('staticData', function () {
            return Cache::remember('static_data', 60, function () {
                // Replace with your data fetching logic
                $current_fiscal_year_id=FiscalYear::where('is_current',true)->pluck('id');
                $previous_fiscal_year_id=FiscalYear::where('is_previous',true)->pluck('id');
                $next_fiscal_year_id=FiscalYear::where('is_next',true)->pluck('id');
                $palikaId = config('app.palika_id');

                $localLevel = LocalLevel::with(['district.province'])->findOrFail($palikaId);

                return [
                    'current_fiscal_year' => $current_fiscal_year_id,
                    'previous_fiscal_year' => $previous_fiscal_year_id,
                    'next_fiscal_year' => $next_fiscal_year_id,
                    'local_level' => [
                        'local_level_id' => $localLevel->id,
                        'local_level_name' => $localLevel->name_np,
                        'district' => [
                            'district_id' => $localLevel->district->id,
                            'district_name' => $localLevel->district->name_np,
                            'province' => [
                                'province_id' => $localLevel->district->province->id,
                                'province_name' => $localLevel->district->province->name_np,
                            ],
                        ],
                    ],
                ];
            });
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
