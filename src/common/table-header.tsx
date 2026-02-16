import { typo } from "@/constant/typography";

const TableHeaders = ({ title }: { title: string }) => {
  return (
    <div className="">
      <h3 className={` ${typo.h3} capitalize font-bold`}>{title}</h3>
      <p className={`${typo.p}`}>
        View the list of {title.toLowerCase()} below.
      </p>
    </div>
  );
};

export default TableHeaders;
