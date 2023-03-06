import React from "react";
import { Route, Routes } from "react-router-dom";

import Specificbook from "./Specific-book";
import Booklist from "./Book-list";

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/Specificbook" element={<Specificbook />} />
      <Route path="/Booklist" element={<Booklist />} />
    </Routes>
  );
}
