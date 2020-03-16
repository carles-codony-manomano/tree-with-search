import { useContext } from "react";
import TreeContext from "./TreeContext";

export default function useTree() {
  return useContext(TreeContext);
}
