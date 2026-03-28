# useing for date picker

1. yarn add react-nepali-datetime-picker

# naming conventions used
 1. for resource controller
      Route::resource('relief-fund-allocations', ReliefFundAllocationController::class);
 

2. for permissions
   - view-relief-fund-allocations
   - create-relief-fund-allocations
   - update-relief-fund-allocations
   - delete-relief-fund-allocations

3. for model
   -ReliefFundAllocation

4. for table
   -relief_fund_allocations

# for using model with default datatable mui grid always extend via BaseModel like this 
 class ReliefPrioritization extends BaseModel
 
 if needed custom changes we can do 
  public static function getTableColumns()
 {
    $columns = parent::getTableColumns(); // Get base columns

    // Customize specific column
    $columns[0]['flex'] = 2; // Example: increase 'flex' for the first column

    return $columns;
} 
 like this.

#  use command for creating request classes 
 pa make:request-classes User  where suer is model name and before this fillable columns should be defined...it will create all request classes with validations as well..

# for generating form
 php artisan make:form User where User is model name need to set title in controller
