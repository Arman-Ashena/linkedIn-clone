import React from "react";
import { motion } from "framer-motion";

const BackDrop = ({ children, onClick }) => {
  return (
    <motion.div
      className="bg-black/70 overflow-y-scroll w-full h-full top-0 left-0 absolute flex 
    items-end justify-center z-40"
      initial={{ opacity: 0 }}
      onClick={onClick}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default BackDrop;
