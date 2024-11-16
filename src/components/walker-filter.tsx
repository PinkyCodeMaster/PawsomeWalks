import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const specialties = [
  "Small Dogs",
  "Large Dogs",
  "Puppies",
  "Senior Dogs",
  "Special Needs",
  "Behavioral Training",
  "Group Walks",
  "Athletic Training",
];

interface WalkerFilterProps {
  selectedSpecialty: string | null;
  onSpecialtyChange: (specialty: string | null) => void;
}

export function WalkerFilter({
  selectedSpecialty,
  onSpecialtyChange,
}: WalkerFilterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Specialties</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {specialties.map((specialty) => (
          <Button
            key={specialty}
            variant={selectedSpecialty === specialty ? "default" : "ghost"}
            className="justify-start"
            onClick={() =>
              onSpecialtyChange(selectedSpecialty === specialty ? null : specialty)
            }
          >
            {specialty}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}