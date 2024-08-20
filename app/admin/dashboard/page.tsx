import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { fetchAdminCharacters } from '@/actions/character-actions';

async function DashboardHome() {
    const characters = await fetchAdminCharacters();
  
    return (
      <Table>
        <TableCaption>Total Characters : {characters.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Angelegt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {characters.map((char) => {
            const { id: charId, name, createdAt, user, attributes, skills } =
              char;
            return (
              <TableRow key={charId}>
                <TableCell>{name}</TableCell>
                <TableCell>{createdAt.toISOString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
  export default DashboardHome;