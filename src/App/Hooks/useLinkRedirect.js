import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function useLinkRedirect({ Link }) {
    const navigateTo = useNavigate();

    useEffect(() => {
        navigateTo(Link);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Link])
}