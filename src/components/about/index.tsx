import { Box } from "@/components/index";
import { FaMoneyCheck } from "react-icons/fa";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { BsCardList } from "react-icons/bs";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="h-500px mt-12 pb-12 md:max-w-[1040px] md:mx-auto px-4"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex justify-between gap-6 h-[100%] py-4"
      >
        <Box
          icon={<FaMoneyCheck />}
          title="Personal Finances"
          description="Analyze reports to reconcile activities in your account."
        />
        <Box
          icon={<MdOutlineSettingsSuggest />}
          title="Assign Roles & Aunthenticate users"
          description="With our platform Easily assign roles & Aunthenticate users."
        />
        <Box
          icon={<BsCardList />}
          title="Track Users And Customers"
          description="It is easier to track users and customers using our platform. You can also at glance track bookings and see a data visualization of how the business is performing."
        />
      </motion.div>
    </motion.section>
  );
};

export default About;
