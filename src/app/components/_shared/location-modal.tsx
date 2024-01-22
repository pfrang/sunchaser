"use client";
import { useUserLocation } from "app/hooks/use-user-location";
import { useEffect, useRef } from "react";

import { useShouldHydrate } from "../../hooks/use-should-hydrate";

export const LocationModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { userLocation } = useUserLocation();

  useEffect(() => {
    if (!userLocation) {
      modalRef?.current?.showModal();
    } else {
      modalRef?.current?.close();
      modalRef?.current?.removeAttribute("open");
    }
  }, [userLocation]);

  const shouldHydrate = useShouldHydrate();

  return (
    <>
      {shouldHydrate && (
        <dialog ref={modalRef} className="fixed inset-0 flex p-6 shadow-lg">
          <div className=" w-full rounded-lg bg-white p-5">
            <p className="mb-4 text-2xl font-bold">Welcome to Sunchaser</p>
            <p className="text-variant-regular mb-4 text-xl">
              Please accept geo location
            </p>
          </div>
        </dialog>
      )}
    </>
  );
};
