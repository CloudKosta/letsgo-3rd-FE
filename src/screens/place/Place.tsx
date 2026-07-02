import SearchInput from "./SearchInput";
import LookupTable from "./LookupTable";
import PlaceBox from "./PlaceBox";
import "./Place.css";

export default function Place() {
    return (
        <div className="place-container">
            <SearchInput />
            <LookupTable />
            <PlaceBox />
        </div>
    );
}

