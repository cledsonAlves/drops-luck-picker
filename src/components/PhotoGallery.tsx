import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Upload } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Photo {
  id: number;
  url: string;
  caption: string;
  author: string;
  timestamp: Date;
}

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      url: "/placeholder.svg",
      caption: "Time Drops Tech em ação!",
      author: "João",
      timestamp: new Date(),
    },
    {
      id: 2,
      url: "/placeholder.svg",
      caption: "Retrospectiva 2024",
      author: "Maria",
      timestamp: new Date(),
    },
    {
      id: 3,
      url: "/placeholder.svg",
      caption: "AWS Community Day",
      author: "Pedro",
      timestamp: new Date(),
    },
    {
      id: 4,
      url: "/placeholder.svg",
      caption: "StackSpot Meetup",
      author: "Ana",
      timestamp: new Date(),
    },
  ]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newPhoto: Photo = {
        id: photos.length + 1,
        url: URL.createObjectURL(file),
        caption: file.name,
        author: "Você",
        timestamp: new Date(),
      };
      setPhotos([newPhoto, ...photos]);
      toast.success("Foto enviada com sucesso!");
    }
  };

  return (
    <Card className="col-span-full bg-aws-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-aws-800">
          <Camera className="h-6 w-6" />
          Mural de Fotos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <label
            htmlFor="photo-upload"
            className="inline-flex items-center gap-2 cursor-pointer"
          >
            <Button variant="outline" className="bg-aws-100 hover:bg-aws-200">
              <Upload className="mr-2 h-4 w-4" />
              Enviar Foto
            </Button>
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="flex flex-col items-center gap-3 group animate-participant-enter"
            >
              <Avatar className="w-24 h-24 border-4 border-aws-100 shadow-lg transition-transform group-hover:scale-105">
                <AvatarImage src={photo.url} alt={photo.author} />
                <AvatarFallback className="bg-aws-200 text-aws-800 text-xl">
                  {photo.author.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="font-medium text-aws-800">{photo.author}</h3>
                <p className="text-sm text-aws-600">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};