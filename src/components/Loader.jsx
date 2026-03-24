import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 bg-[#c9a961] rounded-full"
            animate={{
              y: ["0%", "-50%", "0%"],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loader;
