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
import { fetchAllGameAttributes } from '@/actions/attribute-actions';
import Link from 'next/link';

export default async function AttributesPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const searchString = searchParams.search || '';

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
            <TableCell className="font-medium">
              <Link
               href={`/admin/attributes/${attribute.id}`}
               className='underline text-muted-foreground tracking-wide capitalize'
              >
                {attribute.name}
              </Link>
            </TableCell>
            <TableCell>{attribute.shortname}</TableCell>
            <TableCell className="text-right"><Checkbox id="terms" checked={attribute.isdefault} disabled /></TableCell>
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
