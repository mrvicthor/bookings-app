import { motion } from "framer-motion";

type BoxProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Box = ({ icon, title, description }: BoxProps) => {
  return (
    <motion.div
      className="flex flex-col flex-[50%] gap-8 items-center border border-[#8C948C] rounded bg-white h-[400px] py-6 px-4"
      variants={item}
    >
      <i className="box h-16 w-16 flex justify-center items-center rounded-[50%] text-2xl  text-[#0404FC]  bg-[#8C948C] cursor-pointer hover:text-white   hover:bg-[#0404FC]">
        {icon}
      </i>
      <h5 className="font-semibold text-lg">{title}</h5>
      <p className="text-center text-[#8C948C] text-sm">{description}</p>
    </motion.div>
  );
};

export default Box;
