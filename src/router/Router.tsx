import axios from "axios";
import { useEffect, useState } from "react";
import { createBrowserRouter } from "react-router";


export default function Router() {
    const [places, setPlaces] = useState([]);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />
        }
    ])
}