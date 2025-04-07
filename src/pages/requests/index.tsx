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
  const isMobile = useMediaQuery("(max-width: 1280px)");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

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
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      debouncedSearchTerm={debouncedSearchTerm}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
    />
  );
}

export { Requests };
