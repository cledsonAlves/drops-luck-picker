import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Upload } from "lucide-react";
import { toast } from "sonner";

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
      caption: "Retrospectiva 2023",
      author: "Maria",
      timestamp: new Date(),
    },
  ]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to a server
      // For now, we'll just create a local URL
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
          Galeria de Fotos
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-aws-800/90 to-transparent p-4">
                <p className="text-white font-medium">{photo.caption}</p>
                <p className="text-aws-100 text-sm">
                  Por {photo.author} • {photo.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};