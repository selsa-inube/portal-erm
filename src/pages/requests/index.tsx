import { useState, useEffect, useRef } from "react";
import { RequestsNavConfig } from "./config/nav.config";
import { RequestsUI } from "./interface";
import { useMediaQuery } from "@inubekit/inubekit";
import { assignmentOptions, statusOptions } from "./config";

function Requests() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 800px)");

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeFilterModal = () => setIsFilterModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <RequestsUI
      appName={RequestsNavConfig[0].label}
      appRoute={RequestsNavConfig[0].crumbs}
      navigatePage={RequestsNavConfig[0].url}
      isFilterModalOpen={isFilterModalOpen}
      isMenuOpen={isMenuOpen}
      menuRef={menuRef}
      isMobile={isMobile}
      openFilterModal={openFilterModal}
      closeFilterModal={closeFilterModal}
      setIsMenuOpen={setIsMenuOpen}
      assignmentOptions={assignmentOptions}
      statusOptions={statusOptions}
    />
  );
}

export { Requests };
