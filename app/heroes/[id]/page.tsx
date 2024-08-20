import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import { fetchSingleCharacter, updateAttributeHandler, updateCharacterAction } from '@/actions/character-actions';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CollapsibleContainer } from '@/components/global/CollapsibleContainer';
import DropdownActions from '@/components/global/DropDownActions';


async function EditCharacterPage({ params }: { params: { id: string } }) {
  const { id: characterId } = params;
  const character = await fetchSingleCharacter({characterId});
  const { name, notes, attributes, skills, favorite } = character;

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>update character</h1>
      <div className='border p-8 rounded'>
        <FormContainer action={updateCharacterAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <input type='hidden' name='id' value={characterId} />
            <FormInput
              type='text'
              name='name'
              label='character name'
              defaultValue={name}
            />
          </div>
          <SubmitButton text='update character' className='mt-8' />
        </FormContainer>
        <Tabs defaultValue="attributes" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <TabsContent value="attributes">
            <Card>
              <CardHeader>
                <CardTitle>Attributes</CardTitle>
                <CardDescription>
                  The attributes of your character.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <CollapsibleContainer title='Attribute'>
          {attributes.length > 0 ? 
          <Table>
            <TableCaption>Attribute</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Bezeichnung</TableHead>
                <TableHead>Kurz</TableHead>
                <TableHead>Stufe</TableHead>
                <TableHead>Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attributes.map((entry) => {
                const { id, attribute, value, valueMax} = entry;
                return (
                  <TableRow key={id}>
                  <TableCell>{attribute.name}</TableCell>
                  <TableCell>{attribute.shortname}</TableCell>
                  <TableCell>{value} [{valueMax}]</TableCell>
                  <TableCell><DropdownActions entryId={attribute.id} props={value} action={updateAttributeHandler} /></TableCell>
                </TableRow>
                );
              })}
            </TableBody>
          </Table>
          :
          'Keine Packliste vorhanden.'}
        </CollapsibleContainer>
      </div>
    </section>
  );
}
export default EditCharacterPage;