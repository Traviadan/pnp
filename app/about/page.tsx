import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-awi-blue mb-4">
        Über mich
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>eggers-bhv</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>

    </div>
  );
}
