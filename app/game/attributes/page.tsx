import { redirect } from 'next/navigation';
import { verifyAuth } from '@/lib/auth';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@/components/ui/label';
import { fetchAllGameAttributes } from '@/actions/attribute-actions';

export default async function AttributesPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchString = searchParams.search || '';
  const result = await verifyAuth();
  if (!result.user) return redirect('/');

  const attributes = await fetchAllGameAttributes({search: searchString});
  return (
    <Table>
      <TableCaption>A list of all game attributes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Shortname</TableHead>
          <TableHead className="text-right">Default</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attributes.map((attribute) => (
          <TableRow key={attribute.id}>
            <TableCell className="font-medium">{attribute.name}</TableCell>
            <TableCell>{attribute.shortname}</TableCell>
            <TableCell className="text-right"><Checkbox id="terms" checked={attribute.isDefault} disabled /></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Attribute count:</TableCell>
          <TableCell className="text-right">{attributes.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
