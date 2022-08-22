import type { NextPage } from "next";
import { Banner } from "@/components";
import { AnimatePresence, motion } from "framer-motion";

const Home: NextPage = () => {
  return (
    <div
      // style={{
      //   backgroundImage: "url(bg-blue.jpg)",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      // }}
      className="bg-white h-[92.6vh]"
    >
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Banner />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Home;
