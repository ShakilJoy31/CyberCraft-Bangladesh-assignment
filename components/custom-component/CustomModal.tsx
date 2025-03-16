"use client"

import { motion } from "framer-motion";
interface CustomModalProps {
    JSX: JSX.Element;
}
const CustomModal: React.FC<CustomModalProps> = ({ JSX }) => {
    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {JSX}
        </motion.div>
    );
};
export default CustomModal;
