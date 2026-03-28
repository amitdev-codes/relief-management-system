<?php

namespace App\Helpers;

use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class InterestCalculator
{
    public static function calculateInterest($startDate, $lastDate, $installmentAmount, $interestRate)
    {
        try {
            // Convert Nepali dates to Gregorian dates
            $startDateGregorian = self::convertNepaliToGregorian($startDate);
            $lastDateGregorian = self::convertNepaliToGregorian($lastDate);

            // Convert the dates to Carbon instances
            $start = Carbon::parse($startDateGregorian);
            $end = Carbon::parse($lastDateGregorian);

            // Calculate the difference between the dates in years, months, and days
            $diff = $start->diff($end);
            $years = $diff->y;
            $months = $diff->m;
            $days = $diff->d;

            // Calculate yearly, monthly, and daily interest
            $yearlyInterest = ($installmentAmount * $interestRate) / 100;
            $monthlyInterest = $yearlyInterest / 12;
            $dailyInterest = $monthlyInterest / 30;

            // Calculate the total number of days
            $totalDays = ($years * 365) + ($months * 30) + $days;

            // Calculate the total interest amount
            $totalInterestAmount = $dailyInterest * $totalDays;

            // Return the results as an array
            return [
                'yearly_interest' => $yearlyInterest,
                'monthly_interest' => $monthlyInterest,
                'daily_interest' => $dailyInterest,
                'total_interest_amount' => $totalInterestAmount,
                'duration' => [
                    'years' => $years,
                    'months' => $months,
                    'days' => $days
                ]
            ];
        } catch (\Exception $e) {
            Log::error('Error calculating interest: ' . $e->getMessage());
            throw new \Exception('Error calculating interest. Please try again later.');
        }
    }

    private static function convertNepaliToGregorian($nepaliDate)
    {
        try {
            $apiUrl = 'https://api.example.com/nepali-to-gregorian';
            $response = Http::get($apiUrl, ['date' => $nepaliDate]);

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['gregorian_date'])) {
                    return $data['gregorian_date'];
                }
            }

            // If API call fails or doesn't return expected data, log the error and return the original date
            Log::warning('Failed to convert Nepali date to Gregorian. Using original date.', [
                'nepali_date' => $nepaliDate,
                'response' => $response->body()
            ]);
            return $nepaliDate;
        } catch (\Exception $e) {
            Log::error('Error converting Nepali date to Gregorian: ' . $e->getMessage());
            return $nepaliDate;
        }
    }
}
