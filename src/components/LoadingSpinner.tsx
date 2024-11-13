import { Spinner } from '@material-tailwind/react';

function LoadingSpinner() {
    return (
        <div className="flex h-[calc(100vh-3.5rem)] items-center justify-center">
            <Spinner className="h-8 w-8" color="green" />
        </div>
    );
}

export default LoadingSpinner;
