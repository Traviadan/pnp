import sr_metatypes from '../../lib/sr_metatypes.json';
import { SelectContainer } from "../form/SelectContainer";
import { SelectItem } from "../ui/select";
import { Character } from '@/lib/schemas';

export async function MetatypeSelect({
  search = '',
  character,
}: {
  search: string;
  character?: Character;
}) {
  if (!sr_metatypes) {
    return 'Keine Metatypen definiert?!';
  }

  return (
    <SelectContainer 
      name="metatypeId"
      css="w-1/2"
      placeholder="Metatyp auswählen"
      defaultValue=''>
      {sr_metatypes.metatypes.map((entry) => {
        const { id, name } = entry;
        return (<SelectItem key={id} value={id.toString()}>{name}</SelectItem>);
      })}
    </SelectContainer>
  );
}