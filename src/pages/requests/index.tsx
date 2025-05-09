import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@inubekit/inubekit";

import { RequestsNavConfig } from "./config/nav.config";
import { RequestsUI } from "./interface";
import { assignmentOptions, statusOptions } from "./config";
import { IOption } from "./types";

function Requests() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<IOption[]>([]);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const isTablet = useMediaQuery("(max-width: 1280px)");
  const isMobile = useMediaQuery("(max-width: 490px)");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

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

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeFilterModal = () => setIsFilterModalOpen(false);

  return (
    <RequestsUI
      appName={RequestsNavConfig[0].label}
      appRoute={RequestsNavConfig[0].crumbs}
      navigatePage={RequestsNavConfig[0].url}
      isFilterModalOpen={isFilterModalOpen}
      isMenuOpen={isMenuOpen}
      menuRef={menuRef}
      isMobile={isMobile}
      isTablet={isTablet}
      assignmentOptions={assignmentOptions}
      statusOptions={statusOptions}
      searchTerm={searchTerm}
      debouncedSearchTerm={debouncedSearchTerm}
      selectedFilters={selectedFilters}
      setSearchTerm={setSearchTerm}
      setSelectedFilters={setSelectedFilters}
      openFilterModal={openFilterModal}
      closeFilterModal={closeFilterModal}
      setIsMenuOpen={setIsMenuOpen}
    />
  );
}

export { Requests };
