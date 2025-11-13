import { Item, ItemGroup } from "@/components/ui/shadcn/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";

export function UserItemList() {
    return (
        <ItemGroup className="flex flex-col space-y-4">
            {users.map(
                (user) => (
                    <Item key={user.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={user.imageUrl} alt={`@${user.name}`} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>
                                {user.status}
                            </Badge>
                            <Button variant="outline" size="sm">View Profile</Button>
                        </div>
                    </Item>
                )
            )}
        </ItemGroup>
    );
}

interface User {
    id: number;
    name: string;
    email: string;
    status: "active" | "away";
    imageUrl: string;
}

const users: User[] = [
    // ... (your user data array)
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", imageUrl: "https://github.com/shadcn.png" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "away", imageUrl: "https://github.com/janedoe.png" },
];
