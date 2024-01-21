"use client";
import { useUserLocation } from "app/hooks/use-user-location";
import { useEffect, useRef } from "react";

export const LocationModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { userLocation } = useUserLocation();

  useEffect(() => {
    if (!userLocation) {
      return modalRef.current?.showModal();
    } else {
      return modalRef.current?.close();
    }
  }, [userLocation]);

  return (
    <dialog ref={modalRef} className="fixed inset-0 flex p-6 shadow-lg">
      <div className=" w-full rounded-lg bg-white p-5">
        <p className="mb-4 text-2xl font-bold">Welcome to Sunchaser</p>
        <p className="text-variant-regular mb-4 text-xl">
          Please accept geo location
        </p>
      </div>
    </dialog>
  );
};
