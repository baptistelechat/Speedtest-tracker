import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@ui/select";

interface ISpeedTestDataTableSelectProps {
  itemPerPage: string;
  setItemPerPage: React.Dispatch<React.SetStateAction<string>>;
}

const SpeedTestDataTableSelect = ({
  itemPerPage,
  setItemPerPage,
}: ISpeedTestDataTableSelectProps) => {
  const options = ["10", "20", "50", "100"];

  return (
    <div className="flex gap-2 items-center text-base font-normal">
      <p>Nombre de test par page :</p>
      <Select onValueChange={setItemPerPage} defaultValue={itemPerPage}>
        <SelectTrigger className="w-20 ">
          <SelectValue placeholder={itemPerPage} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SpeedTestDataTableSelect;
