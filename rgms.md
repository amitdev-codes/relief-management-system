//debugging relief entries
const SinglePackageForm = ({ processedAllocations, relief_types, reliefFundAllocation = {}, users, processing }) => {
    // ... other state declarations ...

    const [reliefEntries, setReliefEntries] = useState([]);

    useEffect(() => {
        console.log('processedAllocations:', processedAllocations);
        console.log('Initial reliefEntries:', reliefEntries);
        
        if (processedAllocations && processedAllocations.length > 0) {
            setReliefEntries(processedAllocations);
        }
    }, []);

    useEffect(() => {
        console.log('Updated reliefEntries:', reliefEntries);
    }, [reliefEntries]);

    // ... rest of the component ...
}



//Initialize Relief Entries

const [reliefEntries, setReliefEntries] = useState(() => {
    if (processedAllocations && processedAllocations.length > 0) {
        return processedAllocations;
    } else {
        return [{
            relief_type_id: '',
            relief_sub_category_id: '',
            quantity: ''
        }];
    }
});

Update Add Relief Entry Function

const addReliefEntry = () => {
    setReliefEntries(prevEntries => [
        ...prevEntries,
        {
            relief_type_id: '',
            relief_sub_category_id: '',
            quantity: ''
        }
    ]);
};

Update Relief Entries Mapping
{(reliefEntries.length > 0 ? reliefEntries : [{ relief_type_id: '', relief_sub_category_id: '', quantity: '' }]).map((entry, index) => (
    <Grid container spacing={2} key={index} ml={10}>
        {/* ... existing grid items ... */}
    </Grid>
))}

Check Processed Allocations in Parent Component
// In the parent component
console.log('processedAllocations before passing to SinglePackageForm:', processedAllocations);

<SinglePackageForm
    processedAllocations={processedAllocations}
    relief_types={relief_types}
    reliefFundAllocation={reliefFundAllocation}
    users={users}
    processing={processing}
/>