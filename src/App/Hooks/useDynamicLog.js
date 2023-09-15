import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function useDynamicLog({ data, label = "" }) {
    const navigateTo = useNavigate();

    useEffect(() => {
        navigateTo(label, " UPDATED => ", data);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
}