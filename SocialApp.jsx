// Filename: SocialApp.jsx
// Stack: React + JSX, Tailwind CSS (utility classes), shadcn/ui components, lucide-react icons,
//        framer-motion for animations, Recharts for a small analytics widget.
// Notes:
// - This is a single-file, production-style UI scaffold you can drop into a React project.
// - Uses shadcn/ui import paths (e.g. "@/components/ui/button"). If you don't have shadcn/ui,
//   swap those for simple HTML elements or your own component library.
// - Tailwind must be configured in your project. All styles here rely on Tailwind classes.
// - Fully responsive: grid collapses to a single column on small screens, drawers/sheets appear on mobile.
// - Includes: NavBar, Sidebar, Stories, Composer, Feed, Post, RightRail (Trends & Suggestions),
//   Notifications, Messages Drawer, Create Post Dialog, Profile/Settings, and simple Theme Toggle.

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Compass,
  Bell,
  MessageSquare,
  PlusCircle,
  Search,
  Settings,
  Sun,
  Moon,
  Heart,
  Share2,
  MessageCircle,
  Bookmark,
  Ellipsis,
  Camera,
  Video,
  Smile,
  Send,
  Globe,
  Users,
  BarChart3,
  LogOut,
  Check,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RTooltip } from "recharts";

// shadcn/ui components — replace with your UI lib if needed
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

// -------------------------------
// Mock Data
// -------------------------------
const users = [
  { id: 1, name: "Ava Stone", handle: "@avastone", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Liam Cole", handle: "@liamcole", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Maya Khan", handle: "@mayak", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Noah Chen", handle: "@noahc", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "Zara Ali", handle: "@zarali", avatar: "https://i.pravatar.cc/150?img=5" },
];

const stories = users.map((u, i) => ({ id: i + 1, user: u, img: `https://picsum.photos/seed/story${i}/400/700` }));

const samplePosts = [
  {
    id: "p1",
    author: users[0],
    time: "2h",
    text: "Hello world! Kicking off our new launch 🚀 — drop your thoughts!",
    media: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1200&q=80&auto=format&fit=crop",
    likes: 128,
    comments: 23,
    shares: 9,
    liked: false,
    tags: ["launch", "product", "startup"],
  },
  {
    id: "p2",
    author: users[2],
    time: "5h",
    text: "Weekend vibes ✨",
    media: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop",
    likes: 512,
    comments: 88,
    shares: 41,
    liked: true,
    tags: ["travel", "lifestyle"],
  },
  {
    id: "p3",
    author: users[3],
    time: "yesterday",
    text: "Design tip: use consistent spacing scale and 8pt grid for rhythm.",
    media: "",
    likes: 76,
    comments: 12,
    shares: 3,
    liked: false,
    tags: ["design", "tips"],
  },
];

const analyticsData = [
  { day: "Mon", views: 1200 },
  { day: "Tue", views: 1800 },
  { day: "Wed", views: 1600 },
  { day: "Thu", views: 2100 },
  { day: "Fri", views: 3200 },
  { day: "Sat", views: 2800 },
  { day: "Sun", views: 3500 },
];

// -------------------------------
// Helpers
// -------------------------------
const cx = (...c) => c.filter(Boolean).join(" ");

function useTheme() {
  const [dark, setDark] = useState(() => typeof window !== "undefined" && document.documentElement.classList.contains("dark"));
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  return { dark, setDark };
}

// -------------------------------
// Components
// -------------------------------
function TopNav({ onOpenCreate, onOpenMessages, onOpenNotifications, dark, setDark }) {
  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
            <Globe className="h-6 w-6" />
          </div>
          <span className="hidden text-xl font-bold sm:block">NovaSocial</span>
        </div>

        <div className="hidden max-w-xl flex-1 items-center gap-2 px-4 md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
            <Input placeholder="Search posts, people, or tags" className="pl-10" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onOpenNotifications}>
                  <Bell className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onOpenMessages}>
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Messages</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DialogTrigger asChild>
            <Button onClick={onOpenCreate} className="hidden sm:flex">
              <PlusCircle className="mr-2 h-4 w-4" />Create
            </Button>
          </DialogTrigger>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={users[0].avatar} alt={users[0].name} />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={users[0].avatar} />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="leading-tight">
                  <div className="font-medium">{users[0].name}</div>
                  <div className="text-xs opacity-70">{users[0].handle}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Users className="h-4 w-4" /> Create Group
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="ml-2 hidden items-center gap-2 sm:flex">
            <Sun className="h-4 w-4" />
            <Switch checked={dark} onCheckedChange={setDark} />
            <Moon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SideNav({ onCompose }) {
  const items = [
    { icon: Home, label: "Home" },
    { icon: Compass, label: "Discover" },
    { icon: Bell, label: "Notifications" },
    { icon: MessageSquare, label: "Messages" },
    { icon: BarChart3, label: "Analytics" },
  ];

  return (
    <div className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col gap-2 p-2 lg:flex">
      {items.map((it) => (
        <Button key={it.label} variant="ghost" className="justify-start gap-3 rounded-2xl">
          <it.icon className="h-5 w-5" /> {it.label}
        </Button>
      ))}
      <Button onClick={onCompose} className="mt-2 rounded-2xl">
        <PlusCircle className="mr-2 h-5 w-5" /> New Post
      </Button>

      <Card className="mt-4 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Creator Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm opacity-90">
          <div>• Post consistently at peak times.</div>
          <div>• Reply to the first 10 comments.</div>
          <div>• Mix video, carousels, and polls.</div>
        </CardContent>
      </Card>
    </div>
  );
}

function StoriesStrip() {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-3">
            {stories.map((s) => (
              <motion.div key={s.id} whileHover={{ y: -2 }} className="inline-block">
                <div className="relative h-40 w-28 overflow-hidden rounded-2xl">
                  <img src={s.img} alt="story" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 flex items-center gap-2">
                    <Avatar className="border-2 border-white/70">
                      <AvatarImage src={s.user.avatar} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="line-clamp-1 text-sm font-medium text-white drop-shadow">{s.user.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function Composer({ onPost }) {
  const [text, setText] = useState("");
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={users[0].avatar} />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share something inspiring..."
              className="min-h-[80px] resize-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Camera className="h-4 w-4" /> Photo
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Video className="h-4 w-4" /> Video
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Smile className="h-4 w-4" /> Emoji
                </Button>
              </div>
              <Button disabled={!text.trim()} onClick={() => onPost(text)} className="rounded-xl">
                <Send className="mr-2 h-4 w-4" /> Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Post({ post, onToggleLike }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <div className="font-semibold">{post.author.name}</div>
              <div className="text-xs opacity-70">{post.author.handle} • {post.time}</div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Ellipsis className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Mute {post.author.name}</DropdownMenuItem>
              <DropdownMenuItem>Report Post</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="whitespace-pre-wrap text-[15px] leading-6">{post.text}</div>
        {post.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Badge key={t} variant="secondary" className="rounded-full">#{t}</Badge>
            ))}
          </div>
        ) : null}
        {post.media ? (
          <motion.div className="overflow-hidden rounded-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img src={post.media} alt="media" className="max-h-[500px] w-full object-cover" />
          </motion.div>
        ) : null}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className={cx("gap-2", post.liked && "text-red-500")}
            onClick={() => onToggleLike(post.id)}>
            <Heart className="h-4 w-4" /> {post.likes}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" /> {post.comments}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" /> {post.shares}
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <Bookmark className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function RightRail() {
  const suggestions = users.slice(1);
  return (
    <div className="sticky top-16 hidden h-[calc(100vh-4rem)] w-80 shrink-0 flex-col gap-4 p-2 xl:flex">
      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Trends for you</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {[
            { tag: "#React", posts: "89.2K" },
            { tag: "#TailwindCSS", posts: "57.4K" },
            { tag: "#UIUX", posts: "33.1K" },
          ].map((t) => (
            <div key={t.tag} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{t.tag}</div>
                <div className="text-xs opacity-70">{t.posts} posts</div>
              </div>
              <Button size="sm" variant="secondary" className="rounded-full">Follow</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Who to follow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {suggestions.map((u) => (
            <div key={u.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={u.avatar} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="leading-tight">
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs opacity-70">{u.handle}</div>
                </div>
              </div>
              <Button size="sm" className="rounded-full">Follow</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Weekly Reach</CardTitle>
        </CardHeader>
        <CardContent className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="currentColor" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="currentColor" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis hide />
              <RTooltip contentStyle={{ borderRadius: 12 }} />
              <Area type="monotone" dataKey="views" stroke="currentColor" fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationsPanel({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-96 p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <Separator />
        <ScrollArea className="h-full p-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl p-3 hover:bg-muted/60">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 5}`} />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <span className="font-medium">User {i}</span> liked your post. <span className="opacity-70">2h</span>
              </div>
              <Button size="icon" variant="ghost" className="ml-auto">
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function MessagesDrawer({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full p-0 sm:w-[420px]">
        <SheetHeader className="p-4">
          <SheetTitle>Messages</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="grid h-full grid-rows-[auto,1fr,auto]">
          <div className="p-3">
            <Input placeholder="Search messages" />
          </div>
          <ScrollArea className="h-full px-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted/60">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                  <AvatarFallback>DM</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="truncate font-medium">Direct Friend {i + 1}</div>
                    <div className="text-xs opacity-70">{i + 1}m</div>
                  </div>
                  <div className="truncate text-sm opacity-80">Hey! Did you check the latest post?</div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center gap-2 p-3">
            <Input placeholder="Write a message…" />
            <Button size="icon" className="rounded-xl">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CreatePostDialog({ open, onOpenChange, onSubmit }) {
  const [tab, setTab] = useState("text");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!open) {
      setTab("text");
      setText("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="photo">Photo</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="space-y-3">
            <Textarea placeholder="What's happening?" value={text} onChange={(e) => setText(e.target.value)} />
            <div className="flex justify-end">
              <Button disabled={!text.trim()} onClick={() => onSubmit({ type: "text", text })} className="rounded-xl">
                Post
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="photo" className="space-y-3">
            <div className="rounded-xl border border-dashed p-8 text-center">Drop photo here or click to upload</div>
            <div className="flex justify-end">
              <Button onClick={() => onSubmit({ type: "photo", text: "New photo post" })} className="rounded-xl">Post</Button>
            </div>
          </TabsContent>
          <TabsContent value="video" className="space-y-3">
            <div className="rounded-xl border border-dashed p-8 text-center">Paste video URL or upload</div>
            <div className="flex justify-end">
              <Button onClick={() => onSubmit({ type: "video", text: "New video post" })} className="rounded-xl">Post</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// -------------------------------
// Main App
// -------------------------------
export default function SocialApp() {
  const { dark, setDark } = useTheme();
  const [posts, setPosts] = useState(samplePosts);
  const [openCreate, setOpenCreate] = useState(false);
  const [openMsgs, setOpenMsgs] = useState(false);
  const [openNotifs, setOpenNotifs] = useState(false);

  const handlePost = (text) => {
    const newPost = {
      id: crypto.randomUUID(),
      author: users[0],
      time: "now",
      text,
      media: "",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      tags: [],
    };
    setPosts((p) => [newPost, ...p]);
  };

  const handleDialogSubmit = (payload) => {
    if (payload.type === "text") {
      handlePost(payload.text);
    } else {
      handlePost(`${payload.text} 🎉`);
    }
    setOpenCreate(false);
  };

  const toggleLike = (id) => {
    setPosts((p) =>
      p.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? Math.max(0, post.likes - 1) : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <TopNav
          onOpenCreate={() => setOpenCreate(true)}
          onOpenMessages={() => setOpenMsgs(true)}
          onOpenNotifications={() => setOpenNotifs(true)}
          dark={dark}
          setDark={setDark}
        />

        {/* Mobile quick actions */}
        <div className="sticky top-[4rem] z-30 border-b bg-background px-4 py-2 lg:hidden">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" className="rounded-xl">
                  <Compass className="mr-2 h-4 w-4" /> Explore
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-2">
                  {[
                    "Home",
                    "Discover",
                    "Notifications",
                    "Messages",
                    "Analytics",
                    "Bookmarks",
                  ].map((m) => (
                    <Button key={m} variant="ghost" className="w-full justify-start rounded-xl">
                      {m}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <Button className="rounded-xl" onClick={() => setOpenCreate(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create
            </Button>
          </div>
        </div>

        <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-3 py-4 lg:grid-cols-[16rem,minmax(0,1fr),20rem]">
          <SideNav onCompose={() => setOpenCreate(true)} />

          <div className="space-y-4">
            <StoriesStrip />
            <Composer onPost={handlePost} />

            <AnimatePresence mode="popLayout">
              <div className="space-y-4">
                {posts.map((post) => (
                  <motion.div key={post.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <Post post={post} onToggleLike={toggleLike} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>

          <RightRail />
        </main>

        <NotificationsPanel open={openNotifs} onOpenChange={setOpenNotifs} />
        <MessagesDrawer open={openMsgs} onOpenChange={setOpenMsgs} />
        <CreatePostDialog open={openCreate} onOpenChange={setOpenCreate} onSubmit={handleDialogSubmit} />

        <footer className="mx-auto mt-10 max-w-7xl px-4 pb-10">
          <div className="rounded-2xl border p-6 text-sm opacity-80">
            © {new Date().getFullYear()} NovaSocial • Built with React & Tailwind. All names/images are placeholders.
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
