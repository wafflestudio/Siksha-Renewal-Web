import { useState } from "react";
import MobileFilterBottomSheet from "./MobileFilterBottomSheet";
import styled from "styled-components";

export default function MobileFilterChipArray() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <MobileFilterBottomSheet isOpen={sheetOpen} onClose={() => setSheetOpen(false)} />
      <IconButton src="/img/general/filter.svg" onClick={() => setSheetOpen(true)} />
    </>
  );
}

// icon button
const IconButton = styled.img`
  width: 20px;
  height: 20px;
  margin: 0 10px;
  cursor: pointer;
`;
