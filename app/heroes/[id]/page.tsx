import { fetchSingleCharacter, updateAttributeHandler, updateCharacterAction } from '@/actions/character-actions';
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
import { CharacterForm } from '@/components/character/CharacterForm';
import { AttributeAccordion } from '@/components/attributes/AttributeAccordion';

async function EditCharacterPage({ params }: { params: { id: string } }) {
  const { id: characterId } = params;
  const character = await fetchSingleCharacter({characterId});
  const { name, notes, attributes, skills, favorite } = character;

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>update character</h1>
      <div className='border p-8 rounded'>
        
        <CharacterForm action={updateCharacterAction} character={character} />

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
                  <AttributeAccordion attributes={character.attributes}  />
              </CardContent>
              <CardFooter>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>skills</CardTitle>
                <CardDescription>
                  Skills of your character
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">

              </CardContent>
              <CardFooter>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  );
}
export default EditCharacterPage;