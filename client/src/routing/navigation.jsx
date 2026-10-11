"use client";

/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const RouteParamsContext = createContext({});

export function RouteParamsProvider({ params, children }) {
  return (
    <RouteParamsContext.Provider value={params}>
      {children}
    </RouteParamsContext.Provider>
  );
}

RouteParamsProvider.propTypes = {
  params: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export function useParams() {
  return useContext(RouteParamsContext);
}

export function useNavigate() {
  const router = useRouter();

  return useCallback(
    (destination, options) => {
      if (typeof destination === "number") {
        router.back();
      } else if (options?.replace) {
        router.replace(destination);
      } else {
        router.push(destination);
      }
    },
    [router],
  );
}
