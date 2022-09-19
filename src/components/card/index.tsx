import { ProgressCircle } from "@/components/index";

type CardProps = {
  value: number;
  icon: React.ReactNode;
  header: string;
  subheader: string;
};

const Card = ({ value, icon, header, subheader }: CardProps) => {
  return (
    <div className="dashboardCard flex justify-center items-center gap-6 border rounded-lg px-4">
      <div className="flex-[50%] space-y-2">
        <i className="border cursor-pointer flex justify-center  items-center rounded-full border-[#0404FC] hover:bg-[#0404FC] hover:text-[#8C948C] ease-in duration-300 h-8 w-8">
          {icon}
        </i>
        <h4 className="text-lg font-semibold">{header}</h4>
        <p className="text-2xl font-bold">{subheader}</p>
        <h6 className="text-[#8C948C] text-sm">Last 24 Hours</h6>
      </div>
      <ProgressCircle value={value} />
    </div>
  );
};

export default Card;
