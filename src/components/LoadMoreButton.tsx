import { buttonProps } from '@/types/buttonType';

const LoadMoreButton: React.FC<buttonProps> = ({ onClick, buttonTitle }) => {
    return (
        <button
            className="mx-auto rounded-lg bg-black p-2 text-white"
            onClick={onClick}
        >
            {buttonTitle}
        </button>
    );
};

export default LoadMoreButton;
