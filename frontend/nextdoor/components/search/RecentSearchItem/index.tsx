
import { Clock, X } from "lucide-react";

interface RecentSearchItemProps {
    searchValue: string;
}

export default function RecentSearchItem({ searchValue}: RecentSearchItemProps) {
    return (
        <div className="flex items-center justify-between gap-2 py-2">
            <div className="flex items-center gap-2">
                <div className="flex justify-center items-center w-8 h-8 bg-gray200 rounded-full">
                    <Clock className="w-5 h-5 text-gray500"/>
                </div>
                <span>
                    {searchValue}
                </span>
            </div>
            {/* <X className="w-5 h-5 text-gray500" /> */}
        </div>
    )
}
