import { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

export function useNavigationBlocker(shouldBlock: boolean) {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!shouldBlock) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Show native confirm
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [shouldBlock]);

  useEffect(() => {
    const handler = (event: PopStateEvent) => {
      if (shouldBlock) {
        const confirmLeave = window.confirm("You have unsaved changes. Leave this page?");
        if (!confirmLeave) {
          navigate(location.pathname); // stay on same page
          event.preventDefault();
        }
      }
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [shouldBlock, navigate, location]);
}
