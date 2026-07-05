import ConfirmationDialog from "@/components/ConfimationDialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";

const AlbumsTable = () => {
  const { albums, deleteAlbum, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Year</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album) => (
          <TableRow key={album._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={album.imageUrl}
                alt={album.title}
                className="w-10 h-10 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{album.title}</TableCell>
            <TableCell>{album.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                {album.releaseYear}
              </span>
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Music className="h-4 w-4" />
                {album.songs.length} songs
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <ConfirmationDialog
                  title="Delete Album"
                  description={`Are you sure you want to delete "${album.title}"? This will permanently delete the album and all songs inside it. This action cannot be undone.`}
                  onConfirm={() => deleteAlbum(album._id)}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:bg-red-400/10 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </ConfirmationDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default AlbumsTable;
